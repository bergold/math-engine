part of mathengine;

class Tokenizer {
  final Grammar grammar;
  
  Tokenizer.fromGrammar(this.grammar);
  
  List tokenize(String text) {
    var strarr = [text];
    
    grammar.tokens.forEach((token, patterns) {
      patterns.forEach((pattern) {
        
        for (var i = 0; i < strarr.length; i++) {
          var str = strarr[i];
          
          if (str is Token) continue;
          
          var match = pattern.firstMatch(str);
          if (match == null) {
            var before = str.substr(0, match.start);
            var after = str.substr(match.end);
            
            strarr.removeAt(i);
            
            if (before.isNotEmpty) {
              strarr.insert(i++, before);
            }
            
            var wrapped = new Token(token, match[0]);
            strarr.insert(i++, wrapped);
            
            if (after.isNotEmpty) {
              strarr.insert(i++, after);
            }
          }
        }
        
      });
    });
    
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
