const screenshotBtn=document.querySelector('.screenshotBtn');
const imageList=document.querySelector('.imageList');

import "regenerator-runtime/runtime.js";
import html2canvas from 'html2canvas';
import {pageHeight,pageWidth} from './config.js';


screenshotBtn.addEventListener('click',async function()
{
    for (let page of [...document.querySelectorAll('.pageContainer')])
    {
        page.style.border='none';
        const canvas=await html2canvas(page,{scale: 3,height:pageHeight,width:pageWidth})
            
        const newDiv=document.createElement('div');
        newDiv.classList.add('imageContainer');
        imageList.appendChild(newDiv);
        newDiv.innerHTML=
        `
        <button class="deleteImgBtn" type="button">X</button>
        <img  src="${canvas.toDataURL('image/jpeg',3)}" class="canvasImg" alt="">
        <a class="downloadBtn" download='handwritten.jpeg' href="${canvas.toDataURL('image/jpeg', 1)}" t>Download Image</a>
        `;
        page.style.border='1px solid black';
            

    };
    const {left,top}=imageList.getBoundingClientRect();
    console.log(left+pageXOffset,top+pageYOffset);
    window.scrollTo({left:left+pageXOffset,top:top+pageYOffset,behavior:'smooth'});
});

imageList.addEventListener('click',function(e)
{
    if (!e.target.closest('.deleteImgBtn')) return;
    const currImage=e.target.closest('.imageContainer');
    currImage.remove();
})


