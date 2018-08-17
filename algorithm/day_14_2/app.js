/*
		프로그래머스 > 알고리즘 연습 > level1 > 이상한 문자 만들기

        문자열 s는 한 개 이상의 단어로 구성되어 있습니다. 각 단어는 하나 이상의 공백문자로 구분되어 있습니다. 
        각 단어의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열을 리턴하는 함수, solution을 완성하세요.

        제한 조건
    
        - 문자열 전체의 짝/홀수 인덱스가 아니라, 단어(공백을 기준)별로 짝/홀수 인덱스를 판단해야 합니다.
    
        입출력 예
        s	                |    return
        ----------------------------------
        "try hello world"	|    "TrY HeLlO WoRlD"
        

        입출력 예 설명
        try hello world는 세 단어 try, hello, world로 구성되어 있습니다. 
        각 단어의 짝수번째 문자를 대문자로, 홀수번째 문자를 소문자로 바꾸면 TrY, HeLlO, WoRlD입니다. 
        따라서 TrY HeLlO WoRlD 를 리턴합니다.
*/

function solution(s) {
    var arr = [];
    var str = "";
    s = s.split(" ");  //["banana", "apple", "coconut"]
    
    for(let i=0, length=s.length; i<length; i++){        
        for(let j=0; j<s[i].length; j++){
            // 짝수(0,2,4,6) -> 대문자
            if(j%2==0){
               str += s[i][j].toUpperCase();
            // 홀수(1,3,5,7) -> 소문자   
            } else {
               str += s[i][j].toLowerCase();
            }
        }
        if(i<length-1){
            str += " ";   
        }
    }
    return str;
}