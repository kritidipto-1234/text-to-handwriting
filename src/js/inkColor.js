const availableColorSelector=document.querySelector('.availableColorSelector');
const textEditor=document.querySelector('.textEditor');

availableColorSelector.addEventListener('input',function(e)
{
    textEditor.style.color=`${e.target.value}`;
})