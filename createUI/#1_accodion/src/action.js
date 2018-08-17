window.onload = function(){
    var elTitles = document.getElementsByClassName('title_section');
    var elTitlesLength = elTitles.length;
    for (var i = 0; i < elTitlesLength; i++){
        (function (index){
            elTitles[index].addEventListener('click', function () {
                var _this = this;
                var _thisClassList = _this.classList
                var hasIsActive = false;

                for (var k = 0; k < elTitlesLength; k++) {
                    elTitles[k].classList.remove("is_active");
                }

                for (var i = 0, length = _thisClassList.length; i < length; i++) {
                    hasIsActive = false;
                    if (_thisClassList[i] == "is_active"){
                        console.log("has is active class!!!")
                        hasIsActive = true;
                        break;
                    }
                    (!hasIsActive) && _thisClassList.add("is_active");
                }
            });
        })(i);
    }
}