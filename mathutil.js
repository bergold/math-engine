Array.prototype.peek = function () {
    return this[this.length - 1];
};


var calcutil = (function() {
    
    var _ = {};
    
    _.degtorad = function (a) {
        return (a/180)*Math.PI;
    };
    _.degtograd = function (a) {
        return (a/180)*200;
    };
    _.radtodeg = function (a) {
        return (a/Math.PI)*180;
    };
    _.radtograd = function (a) {
        return (a/Math.PI)*200;
    };
    _.gradtodeg = function (a) {
        return (a/200)*180;
    };
    _.gradtorad = function (a) {
        return (a/200)*Math.PI;
    };
    
    _.specialChars = {
        "(": 1,
        ",": 1,
        ")": 1,
        "+": 1,
        "-": 1,
        "*": 1,
        "/": 1,
        "%": 1,
        "^": 1,
        "!": 1
    };
    
    _.constants = {
        "PI": {
            description: "Kreiszahl",
            val: function() {
                return Math.PI;
            }
        },
        "E": {
            description: "Eulersche Zahl",
            val: function() {
                return Math.E;
            }
        },
        "PHI": {
            description: "Goldener Schnitt",
            val: function() {
                return (1 + Math.sqrt(5)) / 2;
            }
        },
        "RANDOM": {
            description: "Eine pseudo-zuf\xE4llige Zahl zwischen 0 und 1",
            val: function() {
                return Math.random();
            }
        }
    };
    
    _.constants['RAND'] = _.constants['RANDOM'];
    
    
    _.functions = {
        "sin": {
            arguments: 1,
            description: "Die Sinus-Funktion",
            eval: function(a) {
                if (this.radix == "deg") a = _.degtorad(a);
                if (this.radix == "grad") a = _.gradtorad(a);
                return Math.sin(a);
            }
        },
        "arcsin": {
            arguments: 1,
            description: "Die Arkussinus-Funktion",
            eval: function(a) {
                var b = Math.asin(a);
                return this.radix == "deg" ? _.radtodeg(b) : this.radix == "grad" ? _.radtograd(b) : b;
            }
        },
        /*"cosec": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },
        "arccosec": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },*/
    
        "cos": {
            arguments: 1,
            description: "Die Kosinus-Funktion",
            eval: function(a) {
                if (this.radix == "deg") a = _.degtorad(a);
                if (this.radix == "grad") a = _.gradtorad(a);
                return Math.cos(a);
            }
        },
        "arccos": {
            arguments: 1,
            description: "Die Arkuskosinus-Funktion",
            eval: function(a) {
                var b = Math.acos(a);
                return this.radix == "deg" ? _.radtodeg(b) : this.radix == "grad" ? _.radtograd(b) : b;
            }
        },
        /*"sec": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },
        "arcsec": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },*/
    
        "tan": {
            arguments: 1,
            description: "Die Tangens-Funktion",
            eval: function(a) {
                if (this.radix == "deg") a = _.degtorad(a);
                if (this.radix == "grad") a = _.gradtorad(a);
                return Math.tan(a);
            }
        },
        "arctan": {
            arguments: 1,
            description: "Die Arkustanges-Funktion",
            eval: function(a) {
                var b = Math.atan(a);
                return this.radix == "deg" ? _.radtodeg(b) : this.radix == "grad" ? _.radtograd(b) : b;
            }
        },
        /*"cot": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },
        "arccot": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },*/
    
    
        /*"sinh": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },
        "arcsinh": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },
        "cosech": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },
        "arccosech": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },*/
    
        /*"cosh": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },
        "arccosh": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },
        "sech": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },
        "arcsech": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },*/
    
        /*"tanh": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },
        "arctanh": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },
        "coth": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },
        "arccoth": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },*/
    
    
        "sqr": {
            arguments: 1,
            description: "Das Quadrat x^2 von x",
            eval: function(a) {
                return Math.pow(a, 2);
            }
        },
        "sqrt": {
            arguments: 1,
            description: "Die Quadratwurzel aus x",
            eval: function(a) {
                return Math.sqrt(a);
            }
        },
        "sign": {
            arguments: 1,
            description: "Das Vorzeichen von x. Ergibt 1 f\xFCr positive x, 0 f\xFCr x=0 und −1 f\xFCr negative Werte von x",
            eval: function(a) {
                return a>0 ? 1 : a<0 ? -1 : 0;
            }
        },
        "h": {
            arguments: 1,
            description: "Die Heaviside-Funktion. Gibt f\xFCr positive x den Wert 1 zur\xFCck, 0,5 f\xFCr x = 0 und 0 f\xFCr negative Werte von x",
            eval: function(a) {
                return a>0 ? 1 : a<0 ? 0 : 0.5;
            }
        },
        "exp": {
            arguments: 1,
            description: "Der Potenz e^x von x",
            eval: function(a) {
                return Math.exp(a);
            }
        },
        "ln": {
            arguments: 1,
            description: "Der nat\xFCrliche Logarithmus von x",
            eval: function(a) {
                return Math.log(a);
            }
        },
        /*"log": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },*/
        "abs": {
            arguments: 1,
            description: "Der absolute Wert von x",
            eval: function(a) {
                return Math.abs(a);
            }
        },
        "floor": {
            arguments: 1,
            description: "Rundet x auf den n\xE4chsten ganzzahligen Wert kleiner oder gleich x",
            eval: function(a) {
                return Math.floor(a);
            }
        },
        "ceil": {
            arguments: 1,
            description: "Rundet x auf den n\xE4chsten ganzzahligen Wert gr\xF6\xDFer oder gleich x",
            eval: function(a) {
                return Math.ceil(a);
            }
        },
        "round": {
            arguments: 1,
            description: "Rundet x auf den n\xE4chsten ganzzahligen Wert",
            eval: function(a) {
                return Math.round(a);
            }
        },
        /*"gamma": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return NaN;
            }
        },*/
        "factorial": {
            arguments: 1,
            description: "Die Fakult\xE4t von x",
            eval: function(a) {
                var b = 1;
                for (var i = 0; i < a; i++) {
                    b *= i + 1;
                }
                return b;
            }
        },
        "fibonacci": {
            arguments: 1,
            description: "Die n-te Fibonaccizahl",
            eval: (function() {
                var fib = function(a) {
                    a = parseInt(a);
                    if (a == 0 || a == 1) return a;
                    else return fib(a-1) + fib(a-2);
                };
                return fib;
            })()
        },
        /*"min": {
            arguments: 2,
            description: "Gibt die kleinere der beiden Zahlen zur\xFCck",
            eval: function(a, b) {
                return Math.min(a, b);
            }
        },
        "max": {
            arguments: 1,
            description: "Gibt die gr\xF6\xDFere der beiden Zahlen zur\xFCck",
            eval: function(a) {
                return NaN;
            }
        },
        "mod": {
            arguments: 1,
            description: "",
            eval: function(a) {
                return Math.(a);
            }
        }*/
    };
    
    _.functions['fib'] = _.functions['fibonacci'];
    
    
    _.operators = {
        "+": {
            assoc: "left",
            precedence: 1,
            operands: 2,
            func: function (a, b) {
                return a + b;
            }
        },
        "-": {
            assoc: "left",
            precedence: 1,
            operands: 2,
            func: function (a, b) {
                b = b || (a * 2);
                return a - b;
            }
        },

        "*": {
            assoc: "left",
            precedence: 2,
            operands: 2,
            func: function (a, b) {
                return a * b;
            }
        },
        "/": {
            assoc: "left",
            precedence: 2,
            operands: 2,
            func: function (a, b) {
                return a / b;
            }
        },
        "mod": {
            assoc: "left",
            precedence: 2,
            operands: 2,
            func: function (a, b) {
                return a % b;
            }
        },

        "^": {
            assoc: "right",
            precedence: 3,
            operands: 2,
            func: function (a, b) {
                return Math.pow(a, b);
            }
        },
        
        "%": {
            assoc: "right",
            precedence: 4,
            operands: 1,
            func: function (a) {
                return a/100;
            }
        },
        "!": {
            assoc: "right",
            precedence: 4,
            operands: 1,
            func: function (a) {
                return _.functions['factorial'].eval.call(this, a);
            }
        }
    };
    
    _.isNumber = function (a) {
        return !isNaN(parseFloat(a)) && isFinite(a);
    };
    _.isConstant = function (a) {
        return a in _.constants;
    };
    _.isFunction = function (a) {
        return a in _.functions;
    };
    _.isOperator = function (a) {
        return a in _.operators;
    };
    
    return _;
    
})();
