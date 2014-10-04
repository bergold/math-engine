part of mathengine;

class Grammar {
  Map<String, List> _tokens = new Map<String, List>();
  
  void addPattern(String token, RegExp pattern) {
    if (_tokens.containsKey(token)) {
      _tokens[token].add(pattern);
    } else {
      _tokens[token] = [pattern];
    }
  }
  
  Map get tokens => new Map.from(_tokens);
  
}
