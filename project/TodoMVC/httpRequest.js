const xmlhttp = (window.XMLHttpRequest) 
                ? new XMLHttpRequest() 
                : new ActiveXObject("Microsoft.XMLHTTP");

// ajax 구현
xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
        // 통신 성공시 구현부분
        console.log(JSON.parse(xmlhttp.responseText));
    }
};

xmlhttp.open("GET", "https://hacker-news.firebaseio.com/v0/user/jl.json", true);
xmlhttp.send();