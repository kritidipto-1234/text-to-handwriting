const ruledBtn = document.querySelector(".linesBtn");
const customCss = document.querySelector("style");

import { state } from "./state.js";

ruledBtn.addEventListener("click", function () {
    state.ruled = !state.ruled;
    customCss.innerHTML = `
    @font-face 
    {
        font-family: "Custom Font";
        src: url(${state.currentFontUrl});
    }
    .pageExtra
    {
        ${state.margin ? "" : "display: none;"}
    } 
    .page,.pageLeft
    {
        ${
            state.ruled
                ? "background-image: linear-gradient(#999 0.05em, transparent 0.1em);background-size: 100% 1.5em;"
                : ""
        }
    }
    .pageContainer .drawCanvas {
        z-index: ${state.editMode === "draw" ? "3" : "1"};
    }
    `;
});
