/*
		프로그래머스 > 알고리즘 연습 > level1 > 나누어 떨어지는 숫자 배열

        문제 설명
        array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요.
        divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.

        제한사항
        arr은 자연수를 담은 배열입니다.
        정수 i, j에 대해 i ≠ j 이면 arr[i] ≠ arr[j] 입니다.
        divisor는 자연수입니다.
        array는 길이 1 이상인 배열입니다.

        arr	            divisor	    return
        [5, 9, 7, 10]	5	        [5, 10]
        [2, 36, 1, 3]	1	        [1, 2, 3, 36]
        [3,2,6]	        10	        [-1]
*/

// 1차 풀이
function solution(arr, divisor) {
    arr.sort(function(a, b){return a-b;});
        
    if(divisor === 1) return arr;
    
    for(var i=0; i<arr.length; i++){
        if(arr[i]%divisor) arr.splice(i--,1);
    }

    return (arr.length === 0)? [-1] : arr
           
}

// 2차 풀이 (다른 방법)
function solution2(arr, divisor) {
    var answer = [];
    
    arr.map(function(item){
        item%divisor===0 && answer.push(item);
    });

    return (answer.length === 0)? [-1] : answer.sort(function(a, b){return a-b;});
           
}

