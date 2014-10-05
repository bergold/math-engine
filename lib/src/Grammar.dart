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
  PatternIterator get patternIterator => new PatternIterator(this._tokens);
  
}

class PatternIterator implements Iterator<RegExp> {
  Map _tokens;
  List _types;
  String _currentToken;
  int _currentIndex;
  RegExp _current;
  bool _finished = false;
  
  PatternIterator(this._tokens) {
    _types = _tokens.keys.toList();
  }
  
  bool moveNext() {
    if (_finished) return false;
    if (_currentToken == null) {
      _currentToken = _types.first;
      _currentIndex = -1;
    }
    if (_currentIndex < _tokens[_currentToken].length - 1) {
      _currentIndex++;
    } else {
      if (_currentToken == _types.last) {
        _current = null;
        _currentToken = null;
        _finished = true;
        return false;
      }
      _currentToken = _types[_types.indexOf(_currentToken) + 1];
      _currentIndex = 0;
    }
    _current = _tokens[_currentToken][_currentIndex];
    return !_finished;
  }
  
  RegExp get current => _current;
  String get currentToken => _currentToken;
}
