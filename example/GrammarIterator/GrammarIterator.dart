library example.mathengine.GrammarIterator;

import "package:mathengine/mathengine.dart";

void main() {
  
  var grammar = new Grammar();
  grammar.addPattern("number", new RegExp(r"(?:\d*\.)?\d+(?:e(?:\+|-)?\d+)?", caseSensitive: false ));
  grammar.addPattern("punctuation", new RegExp(r"(?:\(|,|\)|;)"));
  grammar.addPattern("operator", new RegExp(r"(?:\+|-|\*|\/|\^|%|!)"));
  grammar.addPattern("operator", new RegExp(r"\b(?:mod)\b"));
  grammar.addPattern("variable", new RegExp(r"\b(?:a|b|c|x|y)\b"));
  grammar.addPattern("function", new RegExp(r"\b(?:sin|cos|tan)\b"));
  grammar.addPattern("constant", new RegExp(r"\b(?:PI|E|PHI)\b"));
  
  var pit = grammar.patternIterator;
  while (pit.moveNext()) {
    print(pit.currentToken + ": " + pit.current.toString());
  }
  
}
