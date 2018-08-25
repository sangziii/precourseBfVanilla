var todayObj = new Date();
var year = todayObj.getFullYear();
var month = todayObj.getMonth() + 1;
var icons = document.getElementById('group_arrowIcon');

function initCalendar(nowYear, nowMonth){
    var isLeapYear;
    var NUM_DAY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const NAME_DAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const MONTH_NAME = ["JANUARY", "FEBUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    
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

    // 8월 1일은 수요일 -> NAME_DAY[3] => NAME_DAY[nowMonthFirstDay];

    var $calendar = document.getElementById('calendar'); 
    var $content = document.getElementById('calendar_content');
    var $calendar_headerText = $calendar.getElementsByTagName('h1')[0];

    var $div_blank = document.createElement('div');
    $div_blank.classList.add('blank');
    var totalBlank = '';
    var dayNumText;

    // h1에 년.월 텍스트 갱신
    $calendar_headerText.innerHTML = "" + MONTH_NAME[nowMonth-1] + " " + nowYear;

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
    console.log("year : " + year);
    console.log("month : " + month);

    initCalendar(year, month);
}

initCalendar(year, month);

icons.addEventListener('click', moveMonth);