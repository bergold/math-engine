part of mathengine;

class Tokenizer {
  final Grammar grammar;
  
  Tokenizer.fromGrammar(this.grammar);
  
  List tokenize(String text) {
    var strarr = [text];
    
    var pit = grammar.patternIterator;
    while (pit.moveNext()) {
      
      var i = -1;
      while (++i < strarr.length) {
        var str = strarr[i];
        
        if (str is Token) continue;
        
        var match = pit.current.firstMatch(str);
        if (match != null) {
          var before = str.substring(0, match.start);
          var after = str.substring(match.end);
          var index = i;
          
          strarr.removeAt(index);
          
          if (before.isNotEmpty) {
            strarr.insert(index++, before);
          }
          
          var wrapped = new Token(pit.currentToken, match[0]);
          strarr.insert(index++, wrapped);
          
          if (after.isNotEmpty) {
            strarr.insert(index++, after);
          }
        }
      }
    }
    
    return strarr;
  }
  
  _applyPattern(pattern, strarr, applyfn) {
    for (var i = 0; i < strarr.length; i++) {
      var str = strarr[i];
      if (str is Token) continue;
      var match = pattern.firstMatch(str);
      if (match == null) {
        
      }
    }
  }
  
}
