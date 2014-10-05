part of mathengine;

class Token {
  final String type;
  final String content;
  
  Token(this.type, this.content);
  
  @override
  String toString() => (type + ": '" + content + "'");
  
}
