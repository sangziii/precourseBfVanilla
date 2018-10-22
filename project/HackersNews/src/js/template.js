(function (exports) {
    function Template() {
        console.log('Template is created');
        this.storyTemplate = 
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
                '<span class="age"><a href="item?id={{id}}">{{time}}</a></span> <span id="unv_{{by}}"></span> | <a href="hide?id={{id}}&amp;goto=news">hide</a> | <a href="item?id={{id}}">{{descendants}}&nbsp;comments</a>' +
            '</td>' +
        '</tr>' +
        '<tr class="spacer" style="height:5px"></tr>';
    }
    Template.prototype.insert = function(data){
        // data = [
        //     {
        //         "by": "bpchaps",
        //         "descendants": 51,
        //         "id": 14,
        //         "kids" : [ 18267175, 18266954, 18267075, 18267118, 18267053, 18267048, 18266893, 18266915, 18267091, 18266981, 18259557, 18260846, 18267112, 18267004, 18267023, 18266879, 18266821 ],
        //         "score": 151,
        //         "time": 1539966676,
        //         "title": "The City of Seattle Accidentally Gave Me 32M Emails for $40",
        //         "type": "story",
        //         "url": "https://mchap.io/that-time-the-city-of-seattle-accidentally-gave-me-32m-emails-for-40-dollars4997.html"
        //     }, { ... }, { ... }
        // ];
        var view = '';
        for(var i=0,len=data.length; i<len; i++){
            var template = this.storyTemplate;

            template = template.replace('{{by}}', data[i].by);
            template = template.replace('{{id}}', data[i].id);
            template = template.replace('{{descendants}}', data[i].descendants);
            template = template.replace('{{score}}', data[i].score);
            template = template.replace('{{time}}', data[i].time);
            template = template.replace('{{title}}', data[i].title);
            template = template.replace('{{url}}', data[i].url);

            view += template;
        }
        return view;
    };
    exports.app = exports.app || {};
    exports.app.Template = Template;
})(this);