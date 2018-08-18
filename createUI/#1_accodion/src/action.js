window.onload = function(){
    function accodianInit(accodianDiv){
        var liElements = accodianDiv.querySelectorAll('.title_section');

        function showPanel(titleItem){
            (accodianDiv.querySelector('.is_active')) && accodianDiv.querySelector('.is_active').classList.remove('is_active');
            titleItem.classList.add('is_active');
        }

        function sendEvent(event){
            showPanel(event.currentTarget);
        }        
        
        for(var i=0,len=liElements.length; i<len; i++){
            liElements[i].addEventListener('click', sendEvent);
        }
        showPanel(liElements[0]);
    }

    accodianInit(document.querySelector('.accordion'));
}