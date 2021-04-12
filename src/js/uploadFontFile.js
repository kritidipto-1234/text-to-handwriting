const inputFile=document.querySelector('.inputFile');
const fontSelector=document.querySelector('.availableFontSelector');
const customCss=document.querySelector('style');



import {state} from './state.js';
import {fontObj} from './config.js';
import { startCorrectingFrom} from './pageHandler.js';


let fileUrl;

inputFile.addEventListener('change',async function(e)
{
    const fileObj=this.files[0];
    fileUrl=window.URL.createObjectURL(fileObj);
    state.currentFontUrl=fileUrl;
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
    setTimeout(startCorrectingFrom.bind(null,currPage),100);
});

fontSelector.addEventListener('input',async function(e)
{    
    state.currentFontUrl=fontObj[e.target.value];
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
    setTimeout(startCorrectingFrom.bind(null,currPage),100);
})

