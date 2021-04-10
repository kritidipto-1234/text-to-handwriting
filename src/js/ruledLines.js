const ruledBtn=document.querySelector('.linesBtn');
const customCss=document.querySelector('style');

import {state} from './state.js';

ruledBtn.addEventListener('click',function()
{
    state.ruled=!state.ruled;
    customCss.innerHTML=
    `
    .pageExtra
    {
        ${state.margin?'':'display: none;'}
    } 
    .page,.pageLeft
    {
        ${state.ruled?'background-image: linear-gradient(#999 0.05em, transparent 0.1em);background-size: 100% 22px;':''}
    }
    `;

});