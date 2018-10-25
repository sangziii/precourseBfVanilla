
(function () {
    const PATH_ROOT = "https://hacker-news.firebaseio.com/v0/";
    const PATH_TS = "topstories.json"; //top 500 stories
    const NUM_ARTICLE = 30;
    const PAGE_NAME = "news";
    var nowPage = 1;
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
            '<a href="#" class="morelink" rel="nofollow">More</a>' +
        '</td>' +
    '</tr>';
    
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
        var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.open("GET", PATH_ROOT + path_wanted, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function(){
            // readyState : 4 => DONE (서버 응답 완료) && status : 200 => 정상 응답
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                // 통신 성공시 구현부분
                // console.log(JSON.parse(xmlhttp.responseText));
                callback(JSON.parse(xmlhttp.responseText));
            }
        };
    }

    function renderView(viewCmd, objData, idx){
        var viewCommands = {
            story: function(){
                var template = TEMPLATE_STORIES;
                var time = getTimeDiff(objData.time);

                if(objData.url){
                    var url_compressed = getCompressedUrl(objData.url);
                    template = replaceAll(template, '{{url}}', objData.url);
                    template = replaceAll(template, '{{urlComp}}', url_compressed);
                } else {
                    template = replaceAll(template, '{{url}}', 'https://news.ycombinator.com/item?id=' + objData.id);
                    template = replaceAll(template, '({urlComp}})', '');
                }
                template = replaceAll(template, '{{rank}}', idx+1);
                template = replaceAll(template, '{{by}}', objData.by);
                template = replaceAll(template, '{{id}}', objData.id);
                template = replaceAll(template, '{{descendants}}', objData.descendants);
                template = replaceAll(template, '{{score}}', objData.score);
                template = replaceAll(template, '{{time}}', time);
                template = replaceAll(template, '{{title}}', objData.title);

                
                // return docfrag;
                console.log(template);
                return template
                // view += template;
                // $contentTable.children[0].innerHTML = view + BUTTON_MORE;
                // var $moreLink = document.getElementsByClassName('morelink')[0];
                // $moreLink.href = PAGE_NAME + "p=" + (nowPage + 1);
            }
        };
        return viewCommands[viewCmd]();
    }

    function eachReq(data){
        var count = 0;
        var idsTopStories = data;
        var objTopStories = [];

        console.log(idsTopStories)

        for(var i=0; i<NUM_ARTICLE; i++){
            (function(index){
                var $contentTable = document.getElementsByClassName('itemlist')[0];
                var id = idsTopStories[index];
                var path_item = 'item/' + id + '.json';

                req(path_item, function(obj){
                    objTopStories[index] = obj;
                    $contentTable.children[0].innerHTML = renderView("story", obj);
                    // $contentTable.children[0].appendChild = renderView("story", obj);
                    count++;
                }, index);
            })(i);
        }
    }

    req(PATH_TS, eachReq);
})();