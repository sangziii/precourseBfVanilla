var todayObj = new Date();
var year = todayObj.getFullYear();
var month = todayObj.getMonth() + 1;
var $calendar = document.querySelector('#calendar');
var icons = document.getElementById('group_arrowIcon');

function initCalendar(nowYear, nowMonth){
    var isLeapYear;
    var NUM_DAY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const MONTH_NAME = ["JANUARY", "FEBUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const MONTH_COLOR = ["#9dc6d8", "#00b3ca", "#7dd0b6", "#1d4e89", "#d2b29b", "#ff6860", "#f69256", "#ead98b", "#965251", "#c6cccc", "#4e5c5f", "#513c1f"];
    
    var nowMonthFirstDay = (function getFirstDayName(year, month){
        var dateArg = year + '-' + month + '-1';
        var date = new Date(dateArg);

        // 윤년인지 검사
        if(nowYear%4==0 && nowYear%100!==0 || nowYear%400==0){
            isLeapYear = true;
            NUM_DAY[1] = 29;
        } else {
            isLeapYear = false;
            NUM_DAY[1] = 28;
        }

        return date.getDay(); // 1일이 무슨 요일인지 나옴
    })(nowYear, nowMonth);
  
    var $calender_areaHeader = document.getElementById('calendar_header');
    var $calender_areaWeek = document.getElementById('calendar_weekdays');
    var $content = document.getElementById('calendar_content');
    var $calendar_headerText = $calendar.getElementsByTagName('h1')[0];
    var $div_blank = document.createElement('div');
    $div_blank.classList.add('blank');
    var totalBlank = '';
    var dayNumText;

    // h1에 년.월 텍스트 갱신 + 월별 헤더컬러 추가
    $calendar_headerText.innerHTML = "" + MONTH_NAME[nowMonth-1] + " " + nowYear;
    $calender_areaHeader.style.backgroundColor = MONTH_COLOR[nowMonth-1];
    $calender_areaWeek.style.color = MONTH_COLOR[nowMonth - 1];

    // div.blank 넣기
    for(var i=0; i<nowMonthFirstDay; i++){
        totalBlank += $div_blank.outerHTML;
    }
    $content.innerHTML = totalBlank;

    // 일별 div를 넣기
    for(var k=1,len=NUM_DAY[nowMonth-1]; k<=len; k++){ 
        var $div_dayUnit = document.createElement('div');
        dayNumText = document.createTextNode(k);
        $div_dayUnit.appendChild(dayNumText);
        $content.appendChild($div_dayUnit);
    }
}

function moveMonth(event){
    if(event.target == document.querySelector('.icon_left')){
        if(month == 1){
            year--;
            month = 12;
        } else {
            month--;
        }

    } else if(event.target == document.querySelector('.icon_right')){
        if(month == 12){
            year++;
            month = 1;
        } else {
            month++;
        }
    }
    initCalendar(year, month);
}

initCalendar(year, month);
icons.addEventListener('click', moveMonth);