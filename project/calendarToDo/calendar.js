(function funcCalendar(){
	// 정보 변수
	const MONTH_NAME = ["JANUARY", "FEBUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
	const MONTH_COLOR = ["#9dc6d8", "#00b3ca", "#7dd0b6", "#1d4e89", "#d2b29b", "#ff6860", "#f69256", "#ead98b", "#965251", "#c6cccc", "#4e5c5f", "#513c1f"];
	var NUM_DAY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var isLeapYear;
	var nowMonthFirstDay;

	// Selector 변수
	var $calendar = document.querySelector('#calendar');
	var $icons = document.getElementById('group_arrowIcon');
	var $calender_areaHeader = document.getElementById('calendar_header');
	var $calender_areaWeek = document.getElementById('calendar_weekdays');
	var $content = document.getElementById('calendar_content');
	var $calendar_headerText = $calendar.getElementsByTagName('h1')[0];

	// 오늘 날자 객체 생성 및 년도/월 변수 할당
	var todayObj = new Date();
	var year = todayObj.getFullYear();
	var month = todayObj.getMonth() + 1;
	var day = todayObj.getDate();

	function initCalendar(nowYear, nowMonth){
		// 달의 1일이 무슨 요일인지 nowMonthFirstDay 변수에 저장 => 1은 월요일 7은 일요일
		(function getFirstDayName(){
			var dateArg = nowYear + '-' + nowMonth + '-1';
			var objDate = new Date(dateArg);
			nowMonthFirstDay = objDate.getDay();
		})();
		(function checkLeapYear(){
			// 윤년인지 검사
			if(nowYear%4===0 && nowYear%100!==0 || nowYear%400===0){
				isLeapYear = true;
				NUM_DAY[1] = 29;
			} else {
				isLeapYear = false;
				NUM_DAY[1] = 28;
			}
		})();
		//헤더 부분 스타일 변경
		(function setCalendarHeader(){
			$calendar_headerText.innerHTML = "" + MONTH_NAME[nowMonth-1] + " " + nowYear;
			$calender_areaHeader.style.backgroundColor = MONTH_COLOR[nowMonth-1];
		})();
		//달력 날짜부분 DOM 컨트롤
		(function setCalendarContent(){
			var docFragment = document.createDocumentFragment();
			var $div_blank = document.createElement('div');
			$div_blank.classList.add('blank');
			var totalBlank = '';
			var dayNumText;

			$calender_areaWeek.style.color = MONTH_COLOR[nowMonth - 1];

			// div.blank 넣기
			for(var i=0; i<nowMonthFirstDay; i++){
				totalBlank += $div_blank.outerHTML;
			}
			$content.innerHTML = totalBlank;

			// 일별 div를 넣기
			for(var k=1,len=NUM_DAY[nowMonth-1]; k<=len; k++){
				var $div_dayUnit = document.createElement('div');
				$div_dayUnit.classList.add('item');
				dayNumText = document.createTextNode(k);

				(k === day) && $div_dayUnit.setAttribute("class", "is_today");
				$div_dayUnit.appendChild(dayNumText);
				docFragment.appendChild($div_dayUnit);
			}
			$content.appendChild(docFragment);
		})();

	}

	// 이전,이후 month 이동 함수
	function moveMonth(event){
		if(event.target === $icons.querySelector('.icon_left')){
			if(month === 1){
				year--;
				month = 12;
			} else {
				month--;
			}
		} else if(event.target === $icons.querySelector('.icon_right')){
			if(month === 12){
				year++;
				month = 1;
			} else {
				month++;
			}
		}
		initCalendar(year, month);
	}

	// todo 동작
	function todoApp(){
		console.log('init todoapp');
		var $todoDiv = document.querySelector('#layerTodo')
		var $todayDiv = document.querySelector('.is_today');

		$todayDiv.addEventListener('click', function(e){
			console.log("click");
			$todoDiv.style.display = 'block';
		})
	}

	$icons.addEventListener('click', moveMonth);

	initCalendar(year, month);
	todoApp();
})();
