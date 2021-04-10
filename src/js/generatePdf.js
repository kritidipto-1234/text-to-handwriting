const generatePdfBtn=document.querySelector('.generatePdfBtn');


import { jsPDF } from "jspdf";
import {pdfLeftRightMargin,pdfTopDownMargin,pageHeight,pageWidth} from './config.js';


generatePdfBtn.addEventListener('click',function()
{
    const cnvList=[...document.querySelectorAll('.canvasImg')];
    const doc = new jsPDF({unit:'px',format: [pageWidth+2*pdfLeftRightMargin,pageHeight+2*pdfTopDownMargin],hotfixes:"px_scaling"});
    cnvList.forEach((cnv,i)=>
    {
        doc.addImage(cnv,'JPEG',20, 40, pageWidth, pageHeight);
        if (i+1!==cnvList.length)  doc.addPage({format: [pageWidth+2*pdfLeftRightMargin,pageHeight+2*pdfTopDownMargin]});
    });
    doc.save("handwritten.pdf");
});


