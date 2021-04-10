const inputFile=document.querySelector('.inputFile');
const fontSelector=document.querySelector('.availableFontSelector');

import "regenerator-runtime/runtime.js";
import homemade_apple from '../font/homemade-apple.regular.ttf';
import QEAntonyLark from '../font/QEAntonyLark.ttf';
import QESamRoberts2 from '../font/QESamRoberts2.ttf';
import QEVRead from '../font/QEVRead.ttf';
import Default from '../font/times_new_roman.ttf';

import { startCorrectingFrom} from './pageHandler.js';


const fontObj={homemade_apple,QEAntonyLark,QESamRoberts2,QEVRead,Default};
let fileUrl;

inputFile.addEventListener('change',async function(e)
{
    const fileObj=this.files[0];
    window.URL.revokeObjectURL(fileUrl);
    fileUrl=window.URL.createObjectURL(fileObj);
    let newFont= new FontFace("Custom Font",`url("${fileUrl}")`);
    const fontPromise=await newFont.load();
    document.fonts.add(fontPromise);
    let currPage=document.querySelector('.page');//first page
    startCorrectingFrom(currPage);
});

fontSelector.addEventListener('input',async function(e)
{    
    let myFileUrl=fontObj[e.target.value];
    let newFont= new FontFace("Custom Font",`url(${myFileUrl})`);
    const fontPromise=await newFont.load();
    document.fonts.add(newFont);
    let currPage=document.querySelector('.page');//first page
    startCorrectingFrom(currPage);
})

