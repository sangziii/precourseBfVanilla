/*
    문제 설명
    2016 년 1 월 1 일은 금요일입니다. 2016 년 a월 b일은 무슨 요일일까요 ? 
    두 수 a, b를 입력받아 2016 년 a월 b일이 무슨 요일인지 리턴하는 함수, solution을 완성하세요.
    요일의 이름은 일요일부터 토요일까지 각각 SUN, MON, TUE, WED, THU, FRI, SAT 입니다.
    
    예를 들어 a = 5, b = 24 라면 5 월 24 일은 화요일이므로 문자열 TUE를 반환하세요.

    제한 조건
    - 2016 년은 윤년입니다.
    - 2016 년 a월 b일은 실제로 있는 날입니다.(13 월 26 일이나 2 월 45 일같은 날짜는 주어지지 않습니다)
*/

// 1차 풀이
function solution(a, b, bfNum = 0) {
    var dayPerMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var dayName = ["THU", "FRI", "SAT", "SUN", "MON", "TUE", "WED"];

    for (var i = 0; i < a - 1; i++) {
        bfNum += dayPerMonth[i];
    }
    return dayName[(bfNum + b) % 7];
}