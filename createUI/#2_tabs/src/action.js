window.onload = function(){
    function tabsInit(divTabs){
        var tabGroup = divTabs.querySelector('.header_tabs');
        var tabItems = tabGroup.querySelectorAll('.item');
        var panelGroup = divTabs.querySelector('.contents_panel');
        var panelItem = panelGroup.querySelectorAll('.panel');

        function showPanel(target, index){
            (tabGroup.querySelector('.is_active')) && tabGroup.querySelector('.is_active').classList.remove('is_active');
            for (var i = 0, len = tabItems.length; i < len; i++){
                panelItem[i].setAttribute("style", "display:none");
            }

            target.classList.add('is_active');
            panelItem[index].setAttribute("style", "display:block")
        }

        for(var i=0,len=tabItems.length; i<len; i++){
            (function(index){
                tabItems[index].addEventListener('click', function(event) {
                    showPanel(event.currentTarget, index);
                });
            })(i)
        }

        showPanel(document.querySelectorAll('.item')[0], 0);
    }

    tabsInit(document.getElementById('tabs'));
}