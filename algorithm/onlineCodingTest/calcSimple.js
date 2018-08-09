function add(strArg){
    var answer = 0;

    var arg = strArg.split(" + ");
    var argLength = arg.length;

    for(var i=0; i<argLength; i++){
        arg[i] >>= 0;
        answer += Number(arg[i]);
    }
            
    return answer;
}

function multiply(strArg){
    var answer = 1;

    var arg = strArg.split(" * ");
    var argLength = arg.length;

    for(var i=0; i<argLength; i++){
        arg[i] >>= 0;
        answer *= Number(arg[i]);
    }
            
    return answer;
}

function divide(strArg){
    var answer = 1;

    var arg = strArg.split(" - ");
    var argLength = arg.length;

    for(var i=0; i<argLength; i++){
        arg[i] >>= 0;
        answer *= Number(arg[i]);
    }
            
    return answer;
}

console.log(multiply("2 * 6"));
console.log(divide("2 - 6"));