// (function(){
//     function App() {
//         console.log('App is created');

//         var dbName = 'articles';
//         this.storage = new app.Storage(dbName);
//         this.model = new app.Model(this.storage);
//         this.template = new app.Template();
//         this.view = new app.View(this.template);
//         this.controller = new app.Controller(this.model, this.view);
//     }
//     var todo = new App();
// })();

(function () {
    var xmlhttp = (window.XMLHttpRequest)
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

    // ajax 구현
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            // 통신 성공시 구현부분
            // console.log(JSON.parse(xmlhttp.responseText));
            var arr_topStories = JSON.parse(xmlhttp.responseText);
            var data = {
                "articles": arr_topStories
            };
            localStorage["articles"] = JSON.stringify(data);
            
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
                '<span class="score" id="score_{{id}}">{{score}} points</span> by <a href="user?id={{by}}" class="hnuser">bpchaps</a>' +
                '<span class="age"><a href="item?id={{id}}">{{time}}</a></span> <span id="unv_{{by}}"></span> | <a href="hide?id={{id}}&amp;goto=news">hide</a> | <a href="item?id={{id}}">{{descendants}}&nbsp;comments</a>' +
                '</td>' +
                '</tr>' +
                '<tr class="spacer" style="height:5px"></tr>';
                var data = JSON.parse(localStorage["articles"]).articles;
                var view = '';
                var $contentTable = document.getElementsByClassName('itemlist')[0];
                console.dir(data);
                for(var i=0,len=data.length; i<len; i++){
                    var template = storyTemplate;

                    template = template.replace('{{by}}', data[i].by);
                    template = template.replace('{{id}}', data[i].id);
                    template = template.replace('{{descendants}}', data[i].descendants);
                    template = template.replace('{{score}}', data[i].score);
                    template = template.replace('{{time}}', data[i].time);
                    template = template.replace('{{title}}', data[i].title);
                    template = template.replace('{{url}}', data[i].url);

                    view += template;
                }
                $contentTable.children[0].innerHTML = view;
            

        }
    };
    xmlhttp.open("GET", "https://hacker-news.firebaseio.com/v0/topstories.json", true);
    xmlhttp.send();
})();