const screenshotBtn=document.querySelector('.screenshotBtn');
const imageList=document.querySelector('.imageList');

import "regenerator-runtime/runtime.js";
import html2canvas from 'html2canvas';

screenshotBtn.addEventListener('click',function()
{
    [...document.querySelectorAll('.pageContainer')].forEach(async function(page)
        {
            page.style.border='none';
            const canvas=await html2canvas(page,{scale: 3,height:page.offsetHeight,width:page.offsetWidth});
            const markup=
            `<div class="imageContainer">
            <button class="deleteImgBtn" type="button">x</button>
            <img  src="${canvas.toDataURL('image/jpeg', 1)}" class="canvasImg" alt="">
            <a class="downloadBtn" download='handwritten.jpeg' href="${canvas.toDataURL('image/jpeg', 1)}" t>Download Image</a>
            </div>`;
            imageList.insertAdjacentHTML('beforeend',markup);
            page.style.border='1px solid black';
        });
});

imageList.addEventListener('click',function(e)
{
    if (!e.target.closest('.deleteImgBtn')) return;
    const currImage=e.target.closest('.imageContainer');
    currImage.remove();
})

// imageList.addEventListener('click',function(e)
// {
//     if (!e.target.closest('.downloadBtn')) return;
//     // e.preventDefault();
// })