
// 1차 풀이
function solution(s) {
    var upperStr = [];
    s = s.split('');
    
    for(var i=0;i<s.length;i++){
        if(s[i] == s[i].toUpperCase()){
            upperStr.push(s[i]);
            s.splice(i--,1);
        }
    }

    console.log("lowerCase : ", s);
    console.log("upperCase : ", upperStr);

    return s.sort().reverse().concat(upperStr.sort().reverse()).join('');
}

// 2차 풀이(좀 더 간략화)
function solution(s) {
    var upperStr = [], lowerStr = [];
    s = s.split('');
    
    for(var i=0;i<s.length;i++){
        (s[i] == s[i].toUpperCase()) ? upperStr.push(s[i]) : lowerStr.push(s[i]);            
    }

    console.log("lowerCase : ", lowerStr);
    console.log("upperCase : ", upperStr);

    return s.sort().reverse().concat(upperStr.sort().reverse()).join('');
}

console.log(solution("Zbcdefg"));
console.log(solution("BbdDGasECewqA"));