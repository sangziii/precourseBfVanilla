// 1차풀이 (시간복잡도...)
function solution(n) {
    if(n==2){
        return 1;    
    }
    
    var j = 3;
    var result = 1;
    
    for(j; j<=n; j++){
        var count = 0;
        var i=3;
        
        for(i; i<j; i++){
            if(j%i == 0){ 
                break;
            }
        }   
        result++; 
    }
    return result;
}

function isPrime(n){
    if(n<=1){return false;}
    if(n%2==0){return (n==2);}
    var i=3;

    for(i; i<=Math.sqrt(n); i++){
        if(n%i==0){return false;}
    }
    return true;
}

function sol(num){
    if(num == 2){return 1;}

    var count = 0;
    
    for(var i=2; i<=num; i++){
        if(isPrime(i) == true){count++;}
    }
    return count;
}


function sol(num){
    if(num == 2){return 1;}

    var count = 0;
    
    for(var i=2; i<=num; i++){
        if(isPrime(i) == true){
            count++;
        }
    }
    return count;
}
