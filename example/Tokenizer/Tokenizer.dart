library example.mathengine.Tokenizer;

import "dart:html";

import "package:mathengine/mathengine.dart";

void main() {
  
  var grammar = new Grammar();
  grammar.addPattern("number", new RegExp(r"(?:\d*\.)?\d+(?:e(?:\+|-)?\d+)?", caseSensitive: false ));
  grammar.addPattern("punctuation", new RegExp(r"(?:\(|,|\)|;)"));
  grammar.addPattern("operator", new RegExp(r"(?:\+|-|\*|\/|(?:\bmod\b)|\^|%|!)"));
  grammar.addPattern("variable", new RegExp(r"\b(?:a|b|c|x|y)\b"));
  grammar.addPattern("function", new RegExp(r"\b(?:sin|cos|tan)\b"));
  grammar.addPattern("constant", new RegExp(r"\b(?:PI|E|PHI)\b"));
  
  var tokenizer = new Tokenizer.fromGrammar(grammar);
  document.querySelector("#inp_form").addEventListener("submit", (evt) {
    evt.preventDefault();
    var text = (document.querySelector("#inp") as InputElement).value;
    var out = new StringBuffer();
    var time = -window.performance.now();
    var tokens = tokenizer.tokenize(text);
    time += window.performance.now();
    out.writeAll(tokens, "\n");
    out.writeln("\n-----");
    out.writeln(time.toString() + "ms");
    document.querySelector("#out").text = out.toString();
  });
  
}
