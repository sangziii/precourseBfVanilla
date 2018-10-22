(function(exports){
    function Storage(name){
        console.log('Storage is created');
        
        this._dbName = name;
        var urlReq = "https://hacker-news.firebaseio.com/v0/";
        var urlTopStories = urlReq + "topstories.json";
        console.log(urlTopStories);
        if(!localStorage[name]){
            console.log('DO NOT have localStorage');
            // 요청해서 받아오자
            this.req(name, urlTopStories); 
        }
    }
    Storage.prototype.req = function(name, url){
        console.log('Storage.req() is executed!');
        var xmlhttp = (window.XMLHttpRequest)
            ? new XMLHttpRequest()
            : new ActiveXObject("Microsoft.XMLHTTP");

        // ajax 구현
        xmlhttp.onreadystatechange = function (){
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                // 통신 성공시 구현부분
                console.log(JSON.parse(xmlhttp.responseText));
                var arr_topStories = JSON.parse(xmlhttp.responseText);
                var data = {
                    "articles": arr_topStories
                };
                localStorage[name] = JSON.stringify(data);
                return JSON.parse(xmlhttp.responseText);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    };
    Storage.prototype.find = function(callback){
        console.log('Storage.find() is executed!');
        callback = callback || function(){};
        callback.call(this, JSON.parse(localStorage[this._dbName].articles));
    };
    exports.app = exports.app || {};
    exports.app.Storage = Storage;
})(this);