/*
// 		프로그래머스 > 알고리즘 연습 > level1 > 콜라츠 추측

//         1937년 Collatz란 사람에 의해 제기된 이 추측은, 
//         입력된 수가 짝수라면 2로 나누고, 홀수라면 3을 곱하고 1을 더한 다음, 
//         결과로 나온 수에 같은 작업을 1이 될 때까지 반복할 경우 모든 수가 1이 된다는 추측입니다. 
//         예를 들어, 입력된 수가 6이라면 6→3→10→5→16→8→4→2→1 이 되어 총 8번 만에 1이 됩니다. 
//         입력된 수가 몇 번 만에 1이 되는지 반환하는 함수, solution을 완성해 주세요. 
//         단, 500번을 반복해도 1이 되지 않는다면 –1을 반환해 주세요.

//         제한 조건

//         - 입력된 수, num은 1 이상 8000000 미만인 정수입니다.

//         입출력 예

//         n	        result
//         ------------------
//         6	        8	
//         16	        4	
//         626332       -1	

//         입출력 예 설명
//         입출력 예 #1
//         문제의 설명과 같습니다.

//         입출력 예 # 2
//         16 - > 8 - > 4 - > 2 - > 1 이되어 총 4 번만에 1 이 됩니다.

//         입출력 예 #3
//         626331은 500번을 시도해도 1이 되지 못하므로 -1을 리턴해야합니다.
*/

// 1차 풀이
function solution(num) {
    var count = 0;

    while (num != 1) {
        if (num % 2 == 0) {
            num = num / 2
            count++;
        } else {
            num = num * 3 + 1
            count++;
        }
        if (count >= 500) return -1;
    }
    return count;
}

// 1차 풀이 변형(while -> for문)
function solution2(num, count=0) {
    for(count; count<500; count++){
        if (num % 2 == 0) {
            num = num / 2;
        } else if (num == 1) {
            return count;
        } else if (num % 2 == 1) {
            num = num * 3 + 1;
        }
    }
    return -1;
}

console.log(solution2(6));

// 2차 풀이
function solution3(num, count = 0) {
    return (num == 1) ? (count >= 500 ? -1 : count) : solution3(num%2==0 ? num/2 : num *3+1, ++count);
}