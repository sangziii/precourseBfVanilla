/*
		프로그래머스 > 알고리즘 연습 > level1 > 정수 내림차순으로 배치하기

        문제 설명
        함수 solution은 정수 n을 매개변수로 입력받습니다. n의 각 자릿수를 큰것부터 작은 순으로 정렬한 새로운 정수를 리턴해주세요. 예를들어 n이 118372면 873211을 리턴하면 됩니다.

        제한 조건
        n은 1이상 8000000000 이하인 자연수입니다.
        
        입출력 예
        n	    return
        118372	873211
*/

// 1차 풀이
function solution(n) {
    var answer = 0;
    n=(""+n).split('').map(function(i){return i/1}); 
    var i;
    var temp;
    for(i=0,argLength=n.length;i<argLength;i++){
        if(n[i] < n[i+1]) {
            temp = n[i];
            n[i] = n[i+1];
            n[i+1] = temp;
            i=-1;
        }
    }
    return +(n.join(''));
}

// 2차 풀이
function solution2(n){
    return (""+n).split('').sort().reverse().join("");
}

console.log(solution2(46214));