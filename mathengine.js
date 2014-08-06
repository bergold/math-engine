
var calcengine = angular.module('calcengine', []);

calcengine.value('REGEX_NUMBER', /(?:\d*\.)?\d+/g);
calcengine.value('REGEX_EXP_NUMBER', /(?:\d*\.)?\d+(?:e(?:\+|-)\d+)?/g);

calcengine.value('REGEX_FUNCTION', /^([a-z]+)\(([A-Za-z]+)\)\s*=\s*(.+)$/g);
calcengine.value('REGEX_TERM',     /^[^=]+$/g);

calcengine.factory('Mode', function() {
    var buildMode = function(vars) {
        return [
            { type: MathMirror.Token.TYPE_NUMBER,   regex: '(?:\\d*\\.)?\\d+(?:e(?:\\+|-)\\d+)?' },
            { type: MathMirror.Token.TYPE_CONSTANT, map: buildMode.getConstantsMap() },
            { type: MathMirror.Token.TYPE_VARIABLE, map: buildMode.getVariablesMap(vars) },
            { type: MathMirror.Token.TYPE_CONTROL,  map: ['(', ',', ')', ';'] },
            { type: MathMirror.Token.TYPE_OPERATOR, map: buildMode.getOperatorsMap() },
            { type: MathMirror.Token.TYPE_FUNCTION, map: buildMode.getFunctionsMap() }
        ];
    };
    
    buildMode.getConstantsMap = function() {
        return Object.keys(calcutil.constants);
    };
    buildMode.getFunctionsMap = function() {
        return Object.keys(calcutil.functions);
    };
    buildMode.getOperatorsMap = function() {
        return Object.keys(calcutil.operators);
    };
    buildMode.getVariablesMap = function(v) {
        return Object.keys(v);
    };
    
    return buildMode;
});

calcengine.factory('Calculation', function($q, $timeout, Mode) {
    return {
        
        calc: function(exp, opts, vars) {
            if (!exp || !opts || !vars) return $q.reject(false);
            var tokens, rpn;
            
            try {
                tokens = this.tokenize(exp, vars);
                console.log("Calc tokenized:", tokens);
                
                tokens = this.validate(tokens);
                console.log("Calc validated:", tokens);
                
                rpn = this.shunt(tokens);
                console.log("Calc shunted:", rpn);
            } catch (ex) {
                return $q.reject(ex);
            }
            
            return this.calcRPN(rpn, opts, vars).then(function(data) {
                switch (opts.parse) {
                    case "fix":
                        data.result[0] = data.result[0].toFixed(opts.fix);
                        break;
                    case "exp":
                        data.result[0] = data.result[0].toExponential();
                }
                return data;
            });
        },
        
        tokenize: function(exp, vars) {
            var mode = Mode(vars);
            var Tokenizer = new MathMirror.Tokenizer(mode);
            return Tokenizer.run(exp);
        },
        
        validate: function(tokens) {
            return tokens;
        },
        
        shunt: function(tokens) {
            var stack = [];
            var out = [];
            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];
    
                if (token.type == 'number' || token.type == 'constant' || token.type == 'variable') {
                    out.push(token.value);
                } else if (token.type == 'function') {
                    stack.push(token);
                } else if (token.value == ",") {
                    while (stack.peek() && stack.peek().value != "(") {
                        out.push(stack.pop().value);
                        if (!stack.length) throw "Invalid expression (unexpected ',' or missing opening bracket)";
                    }
                } else if (token.type == 'operator') {
                    while (stack.length && stack.peek() && stack.peek().type == 'operator' && (
                    (calcutil.operators[token.value].assoc == "left" && calcutil.operators[token.value].precedence <= calcutil.operators[stack.peek().value].precedence)
                    || (calcutil.operators[token.value].assoc == "right" && calcutil.operators[token.value].precedence < calcutil.operators[stack.peek().value].precedence))) {
                        out.push(stack.pop().value);
                    }
                    stack.push(token);
                } else if (token.value == "(") {
                    stack.push(token);
                } else if (token.value == ")") {
                    while (stack.peek() && stack.peek().value != "(") {
                        if (!stack.length) throw "Invalid expression (missing opening bracket)";
                        out.push(stack.pop().value);
                    }
                    stack.pop();
                    if (stack.peek() && stack.peek().type == 'function') {
                        out.push(stack.pop().value);
                    }
                } else throw ("Invalid expression (unknown token " + token.value + ")");
    
            }
            while (stack.length) {
                if (stack.peek().value == "(") throw "Invalid expression (more opening than closing brackets)";
                out.push(stack.pop().value);
            }
    
            return out;
        },
        
        calcRPN: function(rpn, opts, vars) {
            var timeout = opts.timeout || 5000;
            var deferred = $q.defer();
            var worker = new Worker('app/worker.calcengine.js');
            worker.onmessage = function(evt) {
                var data = evt.data;
                if (data.status == 'success') deferred.resolve(data);
                else deferred.reject(data);
            };
            $timeout(function() {
                worker.terminate();
                deferred.reject('timeout');
            }, timeout);
            
            worker.postMessage({ cmd: 'run', expression: rpn, options: opts, variables: vars });
            return deferred.promise;
        }

    };
});
