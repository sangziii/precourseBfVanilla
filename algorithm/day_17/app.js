/*
// 		프로그래머스 > 알고리즘 연습 > level1 > 제일 작은 수 제거하기

//         정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, solution을 완성해주세요.
//         단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요. 
//         예를들어 arr이 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, [10]면 [-1]을 리턴 합니다.

//         제한 조건

//         - arr은 길이 1 이상인 배열입니다.
//         - 인덱스 i, j에 대해 i ≠ j이면 arr[i] ≠ arr[j] 입니다.

//         입출력 예

//         arr	        return
//         ------------------
//         [4,3,2,1]    [4,3,2]	   
//         [10]	        [-1]		
*/

// 1차 풀이
function solution(arr, tempidx = 0) {
    var i = 0;
    var temp = arr[0];
    const len = arr.length;

    if (len == 1) return [-1];

    for (i = 1; i < len; i++) {
        if (temp > arr[i]) {
            tempidx = i;
            temp = arr[tempidx];
        }
    }

    arr.splice(tempidx, 1);
    return arr;
}

// 2차 풀이 - Math.min() 메소드 이용
function solution2(arr) {
    if (arr.length == 1) return [-1];
    
    const minVal = Math.min.apply(null, arr);
    const index = arr.findIndex(function(el){
        return el == minVal;
    });
    arr.splice(index, 1);
    return arr;
}