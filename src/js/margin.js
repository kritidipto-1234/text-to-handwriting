const marginBtn=document.querySelector('.marginBtn');
const customCss=document.querySelector('style');

import {state} from './state.js';
import { startCorrectingFrom} from './pageHandler.js';

marginBtn.addEventListener('click',function()
{
    state.margin=!state.margin;
    customCss.innerHTML=
    `
    @font-face 
    {
        font-family: "Custom Font";
        src: url(${state.currentFontUrl});
    }
    .pageExtra
    {
        ${state.margin?'':'display: none;'}
    } 
    .page,.pageLeft
    {
        ${state.ruled?'background-image: linear-gradient(#999 0.05em, transparent 0.1em);background-size: 100% 1.5em;':''}
    }
    `;

    let currPage=document.querySelector('.page');//first page
    setTimeout(startCorrectingFrom.bind(null,currPage),0);//font loading takes time
});


