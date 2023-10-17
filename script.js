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

const operatorPrecedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
};


function convertToPostfix(expression){
    var stack = [];
    var postfix = [];
    len = expression.length;
    for(let i = 0;i<len;i++){
        if(expression[i].match(/\d/)){
            postfix.push(i);
        }
        else if(stack.isEmpty()){
            stack.push(i);
        }
        else{
            if(operatorPrecedence[i]>operatorPrecedence[stack[stack.length-1]]){
                
            }
        }
    }
}