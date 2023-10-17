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
    if(expression.indexOf(' ')===-1){
        const operatos = ['+','-','*','/'];
        for(let i =0;i<expression.length;i++){
            if(operatos.includes(expression[i])){
                expression = expression.slice(0,i) + ' ' + expression[i] + ' ' + expression.slice(i+1);
                i+=2;
            }
        }
    }
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


function evaluatePostfix(expression){
    var Expression = expression.split(' ');
    var stack = [];
    var finalAnswer = 0;
    len = Expression.length;
    for(let i = 0;i<len;i++){
        if(Expression[i].match(/\d/)){
            stack.push(Expression[i]);
        }
        else{
            switch(Expression[i]){
                case '+':
                    var b = stack.pop();
                    var a = stack.pop();
                    var c = add(a,b);
                    stack.push(c);
                    break;
                case '-':
                    var b = stack.pop();
                    var a = stack.pop();
                    var c = subtract(a,b);
                    stack.push(c);
                    break;
                case '*':
                    var b = stack.pop();
                    var a = stack.pop();
                    var c = multiply(a,b);
                    stack.push(c);
                    break;
                case '/':
                    var b = stack.pop();
                    var a = stack.pop();
                    var c = divide(a,b);
                    stack.push(c);
                    break;
            }
        }

    }
    finalAnswer = stack.pop();
    return finalAnswer;
}

var expression = prompt("Enter your expression");
var postfixExpression = convertToPostfix(expression);
var answer = evaluatePostfix(postfixExpression);
console.log("your answer is "+answer);