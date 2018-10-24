
(function () {
    var path_root = "https://hacker-news.firebaseio.com/v0/";
    var path_topStories = "topstories.json"; //top 500 stories
    var storyTemplate =
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
    
    function replaceAll(str, findStr, replaceStr){
        return str.split(findStr).join(replaceStr);
    }

    function getCompressedUrl(fullUrl){
        return fullUrl.match(/https?:\/\/(\w*:\w*@)?[-\w.]+/)[0].replace(/https?:\/\/(www+.)|https?:\/\//, '');
    }

    function getTimeDiff(unixTime){
        var nowTime = new Date().getTime().toString();
        var nowTime_formatted = '';
    
        for(var i=0; i<7; i++){
            nowTime_formatted += nowTime[i];
        }
        console.log("nowTime : ", nowTime);
        console.log("nowTime_formatted : ", nowTime_formatted);

        var timeDiff = parseInt(nowTime_formatted, 10) - unixTime;  // 초 단위 결과
        console.log("timeDiff : ", timeDiff);
        // console.log(timeDiff);
        var result = '';

        if(timeDiff < 60){
            result = timeDiff + " seconds ago";
        } else if(timeDiff>=60 && timeDiff < 3600){
            result = (timeDiff/60) + " minutes ago";
        } else if (timeDiff >= 3600 && timeDiff < 86400){
            result = (timeDiff/3600) + " hours ago";
        } 
        return result;
    }

    function req(path_wanted, callback){
        var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.open("GET", path_root + path_wanted, true);
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

    function eachReq(data){
        var count = 0;
        var idsTopStories = data;
        var objTopStories = [];

        console.log(idsTopStories)

        for(var i=0; i<30; i++){
            (function(index){
                var id = idsTopStories[index];
                var path_item = 'item/' + id + '.json';

                req(path_item, function(obj){
                    objTopStories[index] = obj;
                    count++;
                    // console.dir(objTopStories);
                    
                    if(count === 30){
                        var $contentTable = document.getElementsByClassName('itemlist')[0];
                        if (objTopStories.length === 30){
                            console.dir(objTopStories);
                            var data = objTopStories;
                            var view = '';
                            for (var i = 0, len = data.length; i < len; i++) {
                                var template = storyTemplate;
                                var url_compressed = getCompressedUrl(data[i].url);
                                var time = getTimeDiff(data[i].time);

                                template = replaceAll(template, '{{rank}}', i+1);
                                template = replaceAll(template, '{{by}}', data[i].by);
                                template = replaceAll(template, '{{id}}', data[i].id);
                                template = replaceAll(template, '{{descendants}}', data[i].descendants);
                                template = replaceAll(template, '{{score}}', data[i].score);
                                template = replaceAll(template, '{{time}}', time);
                                template = replaceAll(template, '{{title}}', data[i].title);
                                template = replaceAll(template, '{{url}}', data[i].url);
                                template = replaceAll(template, '{{urlComp}}', url_compressed);
                                view += template;
                            }
                            $contentTable.children[0].innerHTML = view;
                        }
                    }
                });
            })(i);
        }
        
        
    }

    req(path_topStories, eachReq);
})();


// var data = {
//     "articles": arr_topStories
// };
// localStorage["articles"] = JSON.stringify(data);

// var storyTemplate =
//     '<tr class="athing" id="{{id}}">' +
//     '<td align="right" valign="top" class="title"><span class="rank">{{rank}}.</span></td>' +
//     '<td valign="top" class="votelinks"><center><a id="up_{{id}}" href="vote?id={{id}}&amp;how=up&amp;goto=news"><div class="votearrow" title="upvote"></div></a></center></td>' +
//     '<td class="title">' +
//     '<a href="{{url}}" class="storylink">{{title}}</a>' +
//     '<span class="sitebit comhead"> (<a href="from?site={{urlComp}}"><span class="sitestr">{{urlComp}}</span></a>)</span>' +
//     '</td>' +
//     '</tr>' +
//     '<tr>' +
//     '<td colspan="2"></td>' +
//     '<td class="subtext">' +
//     '<span class="score" id="score_{{id}}">{{score}} points</span> by <a href="user?id={{by}}" class="hnuser">bpchaps</a>' +
//     '<span class="age"><a href="item?id={{id}}">{{time}}</a></span> <span id="unv_{{by}}"></span> | <a href="hide?id={{id}}&amp;goto=news">hide</a> | <a href="item?id={{id}}">{{descendants}}&nbsp;comments</a>' +
//     '</td>' +
//     '</tr>' +
//     '<tr class="spacer" style="height:5px"></tr>';
// var data = JSON.parse(localStorage["articles"]).articles;
// var view = '';
// var $contentTable = document.getElementsByClassName('itemlist')[0];
// console.dir(data);
// for (var i = 0, len = data.length; i < len; i++) {
//     var template = storyTemplate;

//     template = template.replace('{{by}}', data[i].by);
//     template = template.replace('{{id}}', data[i].id);
//     template = template.replace('{{descendants}}', data[i].descendants);
//     template = template.replace('{{score}}', data[i].score);
//     template = template.replace('{{time}}', data[i].time);
//     template = template.replace('{{title}}', data[i].title);
//     template = template.replace('{{url}}', data[i].url);

//     view += template;
// }
// $contentTable.children[0].innerHTML = view;