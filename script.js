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
    if (expression.indexOf(' ') === -1) {
        const operatos = ['+', '-', '*', '/'];
        for (let i = 0; i < expression.length; i++) {
            if (operatos.includes(expression[i])) {
                expression = expression.slice(0, i) + ' ' + expression[i] + ' ' + expression.slice(i + 1);
                i += 2;
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


function evaluatePostfix(expression) {
    var Expression = expression.split(' ');
    var stack = [];
    var finalAnswer = 0;
    len = Expression.length;
    for (let i = 0; i < len; i++) {
        if (Expression[i].match(/\d/)) {
            stack.push(Expression[i]);
        }
        else {
            switch (Expression[i]) {
                case '+':
                    var b = stack.pop();
                    var a = stack.pop();
                    var c = add(a, b);
                    stack.push(c);
                    break;
                case '-':
                    var b = stack.pop();
                    var a = stack.pop();
                    var c = subtract(a, b);
                    stack.push(c);
                    break;
                case '*':
                    var b = stack.pop();
                    var a = stack.pop();
                    var c = multiply(a, b);
                    stack.push(c);
                    break;
                case '/':
                    var b = stack.pop();
                    var a = stack.pop();
                    var c = divide(a, b);
                    stack.push(c);
                    break;
            }
        }

    }
    finalAnswer = stack.pop();
    return finalAnswer;
}


function giveAnswer() {
    var inputField = document.getElementById('calculatorScreen');
    var inputValue = inputField.value;
    var postfixExpression = convertToPostfix(inputValue);
    var finalAnswer = evaluatePostfix(postfixExpression);
    inputField.value = finalAnswer;
    if (inputField.value == 'undefined' || inputField.value == 'NaN') {
        inputField.value = '';
    }
}


document.addEventListener('DOMContentLoaded', function () {

    var decimalAllowed = true;
    var inputField = document.getElementById('calculatorScreen');


    function setFocus() {
        inputField.focus();
    }
    inputField.addEventListener('keydown',function(event){
        if(event.key == 'Enter'|| event.code == 13){
            giveAnswer();
        }
    });

    inputField.addEventListener('input', function (event) {
        var inputValue = inputField.value;

        var filteredValue = inputValue.replace(/[^.0-9+*/-]/g, '');
        if (filteredValue.match(/[+*./\-]{2}$/)) {
            filteredValue = filteredValue.slice(0, filteredValue.length - 2) + filteredValue[filteredValue.length - 1]
        }
        if (filteredValue.match(/[+*/-]$/)) {
            decimalAllowed = true;
        }
        else if (filteredValue.match(/[.]$/)) {
            if (decimalAllowed) {
                decimalAllowed = false;
            }
            else {
                filteredValue = filteredValue.replace(/[.]$/, '');
            }
        }
        if (filteredValue.indexOf('.') === -1 || filteredValue.search(/[+*/-]*[\d]*[.][\d]*[+*/-]*/) === -1) {
            decimalAllowed = true;
        }

        inputField.value = filteredValue;
    });

    var buttons = document.querySelectorAll('button');
    buttons.forEach(function (button) {
        button.addEventListener('click', setFocus);
    });
    setFocus();
    inputField.value = '';
});


function clearField() {
    var inputField = document.getElementById('calculatorScreen');
    inputField.value = '';
}

function backspace() {
    var inputField = document.getElementById('calculatorScreen');
    var inputValue = inputField.value;
    inputField.value = inputValue.slice(0, inputValue.length - 1);
}



function putOnScreen(button) {
    var inputField = document.getElementById('calculatorScreen');
    buttonValue = button.value;
    var inputValue = inputField.value;
    inputValue = inputValue + buttonValue;
    inputField.value = inputValue;


    var inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true
    });
    inputField.dispatchEvent(inputEvent);
}