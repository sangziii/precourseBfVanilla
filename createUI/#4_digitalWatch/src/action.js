window.onload = function(){
    var areaClock = document.getElementById('clock');
    

    function calcTime(){
        var objDate = new Date();
        var year = objDate.getFullYear();
        var date = objDate.getDate(); // 20일
        var hours = objDate.getHours(); // 0~23시
        var setHours = objDate.getHours() % 12; // 0~23시 %12
        var minutes = objDate.getMinutes(); // 0~59분
        var seconds = objDate.getSeconds(); // 0~59초
        var meridiem = (hours >= 12) ? "PM" : "AM";
        var dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayName = dayArr[objDate.getDay()];

        var currentTime = meridiem + "  " + hours + " : " + minutes + " : " + seconds;

        areaClock.innerText = currentTime;
    }

    setInterval(calcTime, 1000)

}