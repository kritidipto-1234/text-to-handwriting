const textEditor=document.querySelector('.textEditor');

import {state} from './state.js'

document.addEventListener('keydown', event => //to avoid mozilla from creating divs on enter
{  
   if (event.key === 'Enter') 
   {
      document.execCommand('insertLineBreak')
      event.preventDefault()
   }
})

function startCorrectingFrom(currPage)
{
   while(currPage)//change  to while
   {
      correctOverflow(currPage);
      currPage=currPage.closest('.pageContainer').nextElementSibling?.querySelector('.page');
   }
}

textEditor.addEventListener('input',(m)=>
{
   if (!m.target.closest('.page')) return;
   let currPage=m.target.closest('.page');
   startCorrectingFrom(currPage);
   state.updateCurrentPage(m.target.closest('.page'));
});



function fixNoEnter()//to fix the weird enter key bug in 1st page last line
{
   state.currentPage.blur();
   const nextPage=state.currentPage.closest('.pageContainer').nextElementSibling?.querySelector('.page');
   if (!nextPage) return;
   nextPage.focus();
   nextPage.blur();
}

textEditor.addEventListener('paste', function (e) 
{
   const targetPg=e.target.closest('.page');
   state.currentPage.focus();
   e.preventDefault();
   const text = e.clipboardData.getData('text/plain');
   document.execCommand('insertText', false, text);
   fixNoEnter();
});

textEditor.addEventListener('focusin',function(e)
{
   const page=e.target.closest('.page');
   if (!page) return;
   state.updateCurrentPage(page);
});


function correctOverflow(page)//corrects overflow in currentPage
{
   if(checkOverflow(page) && page.dataset.pageno==state.totalPages)//if this page is overflowing and last page
   {
      makeNewPage();
      state.currentPage.blur();
      // page.nextElementSibling.focus();
   }
   if (checkOverflow(page) && page.dataset.pageno!=state.totalPages)//if this page is overflowing and nt last page
   {
      const nextPage=page.closest('.pageContainer').nextElementSibling.querySelector('.page');

      while(checkOverflow(page))
      {
         if (page.lastChild.nodeType!=3)// its not text
         {
            nextPage.insertAdjacentElement('afterbegin',page.lastChild);//if its br element
         }
         else if (page.lastChild.nodeType==3) //if its a text 
         {
            if (page.lastChild.nodeValue.length<=1)//directly remove node
            {
               nextPage.insertAdjacentHTML('afterbegin',page.lastChild.nodeValue);
               page.removeChild(page.lastChild);
            }
            else //remove last character
            {
               const lastText=page.lastChild.nodeValue;
               page.lastChild.nodeValue=lastText.slice(0,lastText.length-1);
               nextPage.insertAdjacentHTML('afterbegin',lastText[lastText.length-1]);
            }
         }
         state.currentPage.blur();
      }
      // nextPage.focus();
   }
}

function makeNewPage()//makes a new page and adds it to bottom
{
   state.increaseTotalPages();
   const newPage=
   `<div class="pageContainer">
      <div class="container1 upper pageExtra">
         <div class="pageTopLeft pageExtra" contenteditable="true"></div>
         <div class="pageTop pageExtra" contenteditable="true"></div>
      </div>
      <div class="container2 lower">
         <div class="pageLeft pageExtra" contenteditable="true"></div>
         <div class="pageWrapper"><div class="page" tabindex="0" data-pageno="${state.totalPages}" contenteditable="true"></div></div>
      </div>
   </div>`;
   textEditor.insertAdjacentHTML('beforeend',newPage);
}

function checkOverflow(el)//checks for overflow in passed element
{
   var curOverflow = el.style.overflow;

   if ( !curOverflow || curOverflow === "visible" )
      el.style.overflow = "hidden";

   var isOverflowing = el.clientWidth < el.scrollWidth 
      || el.clientHeight < el.scrollHeight;

   el.style.overflow = curOverflow;

   return isOverflowing;
}


export {startCorrectingFrom};