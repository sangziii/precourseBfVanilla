window.onload = function(){
    
    function ratingInit(divRating){
        var listRating = divRating.querySelector('.list_rating');
        var ratingItems = listRating.children;
        var prevIndex = null;
        
        function fillRating(idx){  
            // .is_active 요소가 있을 경우
            (function(){
                // if ((divRating.getElementsByClassName('is_active').length) > 0) {
                if (prevIndex && prevIndex > idx) {
                    for (var i = prevIndex; i > idx; i--) {
                        ratingItems[i].classList.remove('is_active');
                    }
                }
            })();
            
            for(var i=0; i<=idx; i++){
                ratingItems[i].classList.add('is_active');
            }
            
            prevIndex = idx;
        }

        for(var i=0,len=ratingItems.length; i<len; i++){
            (function(idx){
                ratingItems[idx].addEventListener('click', function(){
                    fillRating(idx);
                });
            })(i)
        }
    }
    function ratingInitByInlineStyle(divRating) {
        var listRating = divRating.querySelector('.list_rating');
        var ratingItems = listRating.children;
        var prevIndex = null;

        function fillRating(idx) {
            // .is_active 요소가 있을 경우
            (function(){
                if (prevIndex && prevIndex > idx) {
                    for (var i = prevIndex; i > idx; i--) {
                        ratingItems[i].removeAttribute('style');
                        ratingItems[i].children[0].removeAttribute('style');
                    }
                }
            })();

            for (var i = 0; i <= idx; i++) {
                ratingItems[i].setAttribute('style', 'background-color:#007fff;');
                ratingItems[i].children[0].setAttribute('style', 'color:#fff;');
            }
            prevIndex = idx;
        }

        for (var i = 0, len = ratingItems.length; i < len; i++) {
            (function (idx) {
                ratingItems[idx].addEventListener('click', function(){
                    fillRating(idx);
                });
            })(i)
        }
    }
    ratingInit(document.getElementById('rating_1'));
    ratingInitByInlineStyle(document.getElementById('rating_2'));
}