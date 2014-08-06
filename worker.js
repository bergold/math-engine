importScripts('mathutil.js');

var parseCmd = function(data) {
    var response = {};
    
    if (data.cmd == 'run') {
        response.result = calcRPN(data.expression, data.options, data.variables);
        if (response.result.length != 1) {
            response.status = 'error';
            response.error  = 'NO_UNIQUE_RESULT';
        } else if (isNaN(response.result[0])) {
            response.status = 'error';
            response.error  = 'INVALID_RESULT';
        } else response.status = 'success';
    }
    
    return response;
};

onmessage = function(evt) {
    var data = evt.data;
    var timer = -performance.now();
    var ret = parseCmd(data);
    ret.duration = timer + performance.now();
    postMessage(ret);
};

var calcRPN = function (rpn, options, variables) {
    var stack = [];
    for (var i=0; i<rpn.length; i++) {
        var token = rpn[i];
        if (calcutil.isNumber(token)) {
            stack.unshift(parseFloat(token));
        }
        if (calcutil.isConstant(token)) {
            stack.unshift(calcutil.constants[token].val());
        }
        if (token in variables) {
            stack.unshift(parseFloat(variables[token]));
        }
        if (calcutil.isOperator(token)) {
            var args = stack.splice(0, calcutil.operators[token].operands).reverse(),
                res = calcutil.operators[token].func.apply(options, args);
            stack.unshift(res);
        }
        if (calcutil.isFunction(token)) {
            var args = stack.splice(0, calcutil.functions[token].arguments).reverse(),
                res = calcutil.functions[token].eval.apply(options, args);
            stack.unshift(res);
        }
    }
    return stack;
};
