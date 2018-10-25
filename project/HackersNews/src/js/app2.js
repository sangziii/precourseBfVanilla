
(function () {
    const APP_NAME = "hackersNews";
    const PATH_ROOT = "https://hacker-news.firebaseio.com/v0/";
    const PATH_TS = "topstories.json"; //top 500 stories
    const NUM_ARTICLE = 30;
    const PAGE_NAME = "news";
    var nowPage = 1;
    var nowIdx = 0;
    var queryStringObject = getQueryStringObject();
    var arrTempObj = [];
    const TEMPLATE_STORIES =
        '<tr class="athing" id="{{id}}">' +
            '<td align="right" valign="top" class="title"><span class="rank">{{rank}}.</span></td>' +
            '<td valign="top" class="votelinks"><center><a id="up_{{id}}" href="vote?id={{id}}&amp;how=up&amp;goto=news"><div class="votearrow" title="upvote"></div></a></center></td>' +
            '<td class="title">' +
                '<a href="{{url}}" class="storylink">{{title}}</a>' +
                    '<span class="sitebit comhead"> (<a href="from?site={{urlComp}}"><span class="sitestr">{{urlComp}}</span></a>)</span>' +
            '</td>' +
        '</tr>' +
        '<tr>' +
            '<td colspan="2"></td>' +
            '<td class="subtext">' +
                '<span class="score" id="score_{{id}}">{{score}} points</span> by <a href="user?id={{by}}" class="hnuser">{{by}}</a>' +
                '<span class="age"><a href="item?id={{id}}"> {{time}}</a></span> <span id="unv_{{by}}"></span> | <a href="hide?id={{id}}&amp;goto=news">hide</a> | <a href="item?id={{id}}">{{descendants}}&nbsp;comments</a>' +
            '</td>' +
        '</tr>' +
        '<tr class="spacer" style="height:5px"></tr>';
    const BUTTON_MORE = 
    '<tr class="morespace" style="height:10px"></tr>' +
    '<tr>' +
        '<td colspan="2"></td>' +
        '<td class="title">' +
            '<a href="{{nextPage}}" class="morelink" rel="nofollow">More</a>' +
        '</td>' +
    '</tr>';
    
    function getQueryStringObject(){
        if (!window.location.search) return;
        var a = window.location.search.substr(1).split('&');
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";
            else
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    }

    function checkPage(){
        if(queryStringObject){
            nowPage = queryStringObject.p;
            nowIdx = 30 * (nowPage-1);
        }
    }

    function initStorage(){
        console.log();
        if(!localStorage[APP_NAME]){
            var data = {
                news: {
                    ids: []
                }
            };
            localStorage[APP_NAME] = JSON.stringify(data);
        }
        return true;
    }

    function replaceAll(str, findStr, replaceStr){
        return str.split(findStr).join(replaceStr);
    }

    function getCompressedUrl(fullUrl){
        return fullUrl.match(/https?:\/\/(\w*:\w*@)?[-\w.]+/)[0].replace(/https?:\/\/(www+.)|https?:\/\//, '');
    }

    function getTimeDiff(unixTime){
        unixTime = unixTime.toString();
        var nowTime = new Date().getTime().toString();
        var nowTime_formatted = '';
        var unixTime_formatted = '';
    
        for(var i=0; i<10; i++){
            nowTime_formatted += nowTime[i];
            unixTime_formatted += unixTime[i];
        }

        var timeDiff = parseInt(nowTime_formatted, 10) - unixTime_formatted;  // 초 단위 결과
        var result = '';

        if(timeDiff < 60){
            result = timeDiff + " seconds ago";
        } else if(timeDiff>=60 && timeDiff < 3600){
            result = (Math.floor(timeDiff/60)) + " minutes ago";
        } else if (timeDiff >= 3600 && timeDiff < 86400){
            result = (Math.floor(timeDiff/3600)) + " hours ago";
        } 
        return result;
    }

    function req(path_wanted, callback){
        if(path_wanted === PATH_TS){
            var data = JSON.parse(localStorage.hackersNews);
            if (data.news.ids.length > 0){
                callback(data.news.ids);
                return;
            }
        }
        var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.open("GET", PATH_ROOT + path_wanted, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            // readyState : 4 => DONE (서버 응답 완료) && status : 200 => 정상 응답
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                // 통신 성공시 실행 부분
                if (path_wanted === PATH_TS) {
                    var data = JSON.parse(localStorage[APP_NAME]);
                    data[PAGE_NAME].ids = JSON.parse(xmlhttp.responseText);
                    localStorage[APP_NAME] = JSON.stringify(data);    
                }
                callback(JSON.parse(xmlhttp.responseText));
            }
        };
    }
    function changeTemplate(useTemplate, objData, idx){
        var template = useTemplate;
        var time = getTimeDiff(objData.time);

        if (objData.url) {
            var url_compressed = getCompressedUrl(objData.url);
            template = replaceAll(template, '{{url}}', objData.url);
            template = replaceAll(template, '{{urlComp}}', url_compressed);
        } else {
            template = replaceAll(template, '{{url}}', 'https://news.ycombinator.com/item?id=' + objData.id);
            template = replaceAll(template, '({urlComp}})', '');
        }
        if(idx === NUM_ARTICLE*nowPage-1){
            template += BUTTON_MORE;
            template = replaceAll(template, '{{nextPage}}', PAGE_NAME + "?p=" + (parseInt(nowPage) + 1));
        }
        template = replaceAll(template, '{{rank}}', idx+1);
        template = replaceAll(template, '{{by}}', objData.by);
        template = replaceAll(template, '{{id}}', objData.id);
        template = replaceAll(template, '{{descendants}}', objData.descendants);
        template = replaceAll(template, '{{score}}', objData.score);
        template = replaceAll(template, '{{time}}', time);
        template = replaceAll(template, '{{title}}', objData.title);

        return template;
    }

    function addItem(templateStr, idx) {
        while(nowIdx < NUM_ARTICLE * nowPage){
            if (idx === nowIdx) {
                var $contentTable = document.getElementsByClassName('itemlist')[0];
                var frag = document.createDocumentFragment();
                var $temp_tbody = document.createElement('tbody');
                $temp_tbody.innerHTML = templateStr;
                for (var i = 0, len = $temp_tbody.children.length; i < len; i++) {
                    frag.appendChild($temp_tbody.children[0]);
                }
                $contentTable.children[0].appendChild(frag);
                nowIdx++;

            } else if (arrTempObj[nowIdx]) {
                addItem(arrTempObj[nowIdx], nowIdx);

            } else {
                arrTempObj[idx] = templateStr;
                return;
            }
        }     
    }

    function renderView(viewCmd, objData, idx){
        var viewCommands = {
            story: function(){
                addItem(changeTemplate(TEMPLATE_STORIES, objData, idx), idx);
            }
        };
        return viewCommands[viewCmd]();
    }

    function eachReq(data){
        var idsTopStories = data;
        var objTopStories = [];

        for (var i=nowIdx; i<NUM_ARTICLE*nowPage; i++){
            (function(index){
                var id = idsTopStories[index];
                var path_item = 'item/' + id + '.json';

                req(path_item, function(obj){
                    objTopStories[index] = obj;
                    renderView("story", obj, index);
                }, index);
            })(i);
        }
    }
    function initPage(){
        checkPage();
        initStorage();
        req(PATH_TS, eachReq);
    };
    initPage();
})();