part of mathengine;

class Validator {
  final Grammar grammar;
  
  Validator.fromGrammar(this.grammar);
  
  List validate(List tokens) {
    return tokens;
  }
  
}