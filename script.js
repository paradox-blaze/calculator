function add(a, b) {
    return (Number(a) + Number(b));
}

function multiply(a, b) {
    return (Number(a) * Number(b));
}

function subtract(a, b) {
    return (Number(a) - Number(b));
}

function divide(a, b) {
    return (Number(a) / Number(b));
}





function convertToPostfix(expression) {
    var Expression = (expression).split(' ');
    var j = -1;
    var stack = [];
    var postfix = [];
    const operatorPrecedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    len = Expression.length;

    for (let i = 0; i < len; i++) {
        if (Expression[i].match(/\d/)) {
            postfix[++j] = Expression[i];
        } else {
            while (
                stack.length > 0 &&
                operatorPrecedence[Expression[i]] <= operatorPrecedence[stack[stack.length - 1]]
            ) {
                postfix[++j] = stack.pop();
            }
            stack.push(Expression[i]);
        }
    }

    while (stack.length > 0) {
        postfix[++j] = stack.pop();
    }

    return postfix.join(' ');
}
