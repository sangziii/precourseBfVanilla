// // 1차풀이 (시간복잡도...)
// function solution(n) {
//     if(n==2){
//         return 1;    
//     }
    
//     var j = 3;
//     var result = 1;
    
//     for(j; j<=n; j++){
//         var count = 0;
//         var i=3;
        
//         for(i; i<j; i++){
//             if(j%i == 0){ 
//                 break;
//             }
//         }   
//         result++; 
//     }
//     return result;
// }

// function isPrime(n){
//     if(n<=1){return false;}
//     if(n%2==0){return (n==2);}
//     var i=3;

//     for(i; i<=Math.sqrt(n); i++){
//         if(n%i==0){return false;}
//     }
//     return true;
// }

// function sol(num){
//     if(num == 2){return 1;}

//     var count = 0;
    
//     for(var i=2; i<=num; i++){
//         if(isPrime(i) == true){count++;}
//     }
//     return count;
// }


// function sol(num){
//     if(num == 2){return 1;}

//     var count = 0;
    
//     for(var i=2; i<=num; i++){
//         if(isPrime(i) == true){
//             count++;
//         }
//     }
//     return count;
// }

// function isPrime(n){
//     var i=3;
//     const length = Math.sqrt(n);
    
//     if(n<=1){return false;}
//     if(n%2==0){return (n==2);}
    
//     for(i; i<=length; i++){
//         if(n%i==0){return false;}
//     }
//     return true;
// }

function solution(num){
    console.log("입력한 값은 : " + num + " 입니다");
    var count = 1;
    
    if(num == 2){return 1;}
    console.log("일단 2보다 크므로 count에 소수 2를 포함합니다.");
    console.log("현재 count의 값은 : " + count);
    
    for(var i=3; i<=num; i+=2){
        console.log(i+"에 대해 소수인지 검사를 시작합니다.");

        for(var j=2; j<i; j++){     
            var isPrime = true;
            if(i%j==0){
                console.log(i+"를" + j + "로 나눌수 있으므로 " + i + "는 소수가 아닙니다. break 합니다");
                isPrime = false;
                break;
            } else {
                console.log(i+"를" + j + "로 나눌수 없습니다.");
            }
        }
        if(isPrime){
            console.log(i + "는 소수가 맞습니다. count에 1을 더합니다.");
            count++;
        };
        console.log("현재 count의 값은 : " + count);
    }
    return count;
}

console.log(solution(5));
console.log(solution(10));