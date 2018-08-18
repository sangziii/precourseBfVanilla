window.onload = function(){
    function accodianInit(accodianDiv){
        var liElement = accodianDiv.querySelectorAll('.title_section');

        function showPanel(titleItem){
            (accodianDiv.querySelector('.is_active')) && accodianDiv.querySelector('.is_active').classList.remove('is_active');
            titleItem.classList.add('is_active');
        }

        function sendEvent(event){
            showPanel(event.currentTarget);
        }        
        
        for(var i=0,len=liElement.length; i<len; i++){
            liElement[i].addEventListener('click', sendEvent);
        }

    }

    accodianInit(document.querySelector('.accordion'));
}