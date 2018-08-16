/*
		프로그래머스 > 알고리즘 연습 > level1 > 약수의 합

        문제 설명
        자연수 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수, solution을 완성해주세요.

        제한 조건
        n은 0 이상 3000이하인 자연수입니다.
        
        입출력 예
        n	    return
        12	    28
        5       6
*/

// 1차 풀이
function solution(n) {
    var sum = 0;
    
    for(var i=1; i<=n; i++){
        if(Number.isInteger(n/i)) sum+=i;
    }
    return sum;
}

// 2차 풀이
// 홀수는 짝수를 약수로 가지지 않기 때문에, 짝수는 고려하지 않아도 됨.
function solution2(n){
    var sum = 0;
    var i=1;
    
    var j = (n%2==0) ? 1 : 2;
    for(i; i<=n; i=i+j){
        if(Number.isInteger(n/i)) sum+=i;
    }
    return sum;
}

