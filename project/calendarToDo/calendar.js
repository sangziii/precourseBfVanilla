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

	var $inputTodo = document.getElementById('inputTodo');
	var $btnCloseTodo = document.querySelector('.button_close_layer');
	var $todoContent = document.getElementById('todo_content');

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
				var dateId = nowYear + "-" + nowMonth + "-" + k;
				var $div_dayUnit = document.createElement('div');
				$div_dayUnit.classList.add('item');
				$div_dayUnit.dataset.dateId = dateId;
				dayNumText = document.createTextNode(k);

				(k === day) && $div_dayUnit.classList.add("is_today");
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
		var template_item = '<input type="checkbox" class="checkbox_toggle_item"><label class="inner"></label><a href="#" role="button" class="button_delete"></a>';
		var $todoDiv = document.querySelector('#layerTodo')
		var $numLeft = document.getElementById('numLeft');
		var thisDateId;

		function drawTodo(dateId){
			for (var prop in modelObj[dateId].dataStore) {
				if (modelObj[dateId].dataStore.hasOwnProperty(prop)) {
					var $listTodo = document.getElementById('listTodo');
					var el_todoItem = document.createElement('li');
					el_todoItem.classList.add('item');
					el_todoItem.dataset.todoId = prop;
					el_todoItem.innerHTML = template_item;
					var el_input = el_todoItem.querySelector('input.checkbox_toggle_item');
					modelObj[dateId].dataStore[prop][1] ? el_input.setAttribute("checked","checked") : el_input.removeAttribute("checked");

					var el_todoLabel = el_todoItem.querySelector('label.inner');
					el_todoLabel.textContent = modelObj[dateId].dataStore[prop][0];
					$listTodo.appendChild(el_todoItem);
				}
			}
		}

		function countLeftTodo(){
			var num = modelObj[thisDateId].numActive;
			$numLeft.textContent = num;
		}

		function todoContentAction(e){
			var target = e.target;

			// todo 아이템 삭제
			if(target.className === "button_delete"){
				var el_item = target.parentElement;
				var el_item_id = el_item.dataset.todoId;
				var el_todoList = document.querySelector('#listTodo');
				e.preventDefault();
				console.log(el_item_id);
				el_todoList.removeChild(target.parentElement);
				modelObj[thisDateId].remove(el_item_id);
				console.log(modelObj[thisDateId].dataStore);
				countLeftTodo();

			// todo 아이템 상태 토글
			} else if(target.className === "checkbox_toggle_item"){
				var el_item = target.parentElement;
				var el_item_id = el_item.dataset.todoId;

				if(target.checked){
					el_item.classList.add('is_completed');
					modelObj[thisDateId].setStatus(el_item_id);
				} else {
					el_item.classList.remove('is_completed');
					modelObj[thisDateId].setStatus(el_item_id, false);
				}
				countLeftTodo();

			// 버튼 : clearCompleted 동작
			} else if(target.className === "button_clear_completed"){
				var el_todoList = document.querySelector('#listTodo');
				var clearItemsId = modelObj[thisDateId].clearCompleted();

				if(clearItemsId !== -1){
					for (var i=0,len=clearItemsId.length; i<len; i++) {
						var finishItem = el_todoList.querySelectorAll(".item[data-todo-id='"+ clearItemsId[i] +"']")[0];
						el_todoList.removeChild(finishItem);
					}
				}
			} 
			// 버튼 : filter 동작
			else if(target.className === "inner"){
				var el_button = target.parentElement;
				var el_button_list = el_button.parentElement; 
				var el_buttons = el_button_list.children;
				var els_length = el_buttons.length;
				var listTodo = document.querySelector('#listTodo');
				var listTodoItem = listTodo.querySelectorAll('.item');
				var todo_length = listTodoItem.length;
				
				for (var i=0; i<els_length; i++){
					el_buttons[i].classList.remove('is_active');
				}
				el_button.classList.add('is_active');

				if (el_button.id === "btnViewAll"){
					for (var i=0; i<todo_length; i++) {
						listTodoItem[i].style.display = "block";
					}
				} else if (el_button.id === "btnViewActive"){
					for (var i=0; i<todo_length; i++) {
						if (listTodoItem[i].classList.contains('is_completed')){
							listTodoItem[i].style.display = "none";
						} else {
							listTodoItem[i].style.display = "block";
						}
					}

				} else if (el_button.id === "btnViewComleted"){
					for (var i=0; i<todo_length; i++) {
						if (!listTodoItem[i].classList.contains('is_completed')) {
							listTodoItem[i].style.display = "none";
						} else {
							listTodoItem[i].style.display = "block";
						}
					}
				}
				
			}
		}

		function filterItem(e){
			var target = e.target;

		}

		$content.addEventListener('click', function(e){
			var _target = e.target

			if(e.target.classList.contains('item')){
				// view에 관한 동작
				$todoDiv.style.display = 'block';

				// model에 관한 동작
				thisDateId = _target.dataset.dateId;

				if(modelObj.hasOwnProperty(thisDateId)){
					drawTodo(thisDateId);
					console.log(modelObj);
				} else {
					initTodo(thisDateId);
					console.log(modelObj);
				}
			}

			countLeftTodo();
		});

		$inputTodo.addEventListener('keypress', function(e){
			if(this.value && e.which === 13){
				var $listTodo = document.getElementById('listTodo');
				var todoDataId = modelObj[thisDateId].todoDataId;
				// dom컨트롤
				var el_todoItem = document.createElement('li');
				el_todoItem.classList.add('item');
				el_todoItem.dataset.todoId = todoDataId;
				el_todoItem.innerHTML = template_item;
				var el_todoLabel = el_todoItem.querySelector('label.inner');
				el_todoLabel.textContent = this.value;
				$listTodo.appendChild(el_todoItem);

				// model관련
				modelObj[thisDateId].append(todoDataId, [this.value, false]);
				console.log(modelObj);
				countLeftTodo();

				// input RESET
				this.value = '';
			}
		});

		$todoContent.addEventListener('click', todoContentAction);
	}

	// todo 레이어 닫기
	function closeLayer(e){
		var $listTodo = document.querySelector('#listTodo');
		var $items = $listTodo.querySelectorAll('.item');
		console.log($items);
		var layer = e.target.parentElement;
		e.preventDefault();
		layer.style.display = "none";

		for(var i=0,len=$items.length; i<len; i++){
			$listTodo.removeChild($items[i]);
		}

	}


	// 이벤트 리스너
	$icons.addEventListener('click', moveMonth);
	$btnCloseTodo.addEventListener('click', closeLayer);

	initCalendar(year, month);
	todoApp();
})();