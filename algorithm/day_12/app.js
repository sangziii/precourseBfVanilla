/*
		프로그래머스 > 알고리즘 연습 > level1 > 정수 제곱근 판별

        문제 설명
        임의의 정수 n에 대해, n이 어떤 정수 x의 제곱인지 아닌지 판단하려 합니다. 
        n이 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 정수 x의 제곱이 아니라면 -1을 리턴하는 함수를 완성하세요.

        제한 조건
        n은 1이상, 50000000000000 이하인 정수입니다.
        
        입출력 예
        n	    return
        121	    144
        3       -1
*/

// 1차 풀이
function solution(n) {
    var n_2 = Math.sqrt(n);
    return Number.isInteger(n_2) ?(n_2+1)**2 : -1;
}

// 2차 풀이
function solution2(n){
    for(var i=0; i*i<=n; i++){
        if(i*i == n){
            return (i+1)**2;
        } 
    }
    return -1;
}

console.log(solution2(121));