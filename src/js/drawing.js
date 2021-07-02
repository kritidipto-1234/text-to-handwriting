import { state } from "./state.js";

const customCss = document.querySelector("style");
const switchModeBtn = document.querySelector(".switchModeBtn");
const textEditor = document.querySelector(".textEditor");

switchModeBtn.addEventListener("click", switchMode);

function switchMode(e) {
    if (state.editMode === "write") {
        state.editMode = "draw";

        switchModeBtn.textContent = "Switch to Writing Mode";
    } else if (state.editMode === "draw") {
        state.editMode = "write";

        switchModeBtn.textContent = "Switch to Drawing Mode";
    }

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
}

textEditor.addEventListener("mousedown", startLine);
textEditor.addEventListener("mousemove", continueLine);
textEditor.addEventListener("mouseup", stopLine);

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return { x, y };
}

let canvas;
let ctx;

function startLine(e) {
    if (!e.target.closest(".drawCanvas")) return;
    const { x, y } = getMousePosition(e.target.closest(".drawCanvas"), e);
    canvas = e.target.closest(".drawCanvas");
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = state.inkColor;
    ctx.fillStyle = state.inkColor;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.fillRect(x, y, 2, 2);
}

function continueLine(e) {
    if (!e.target.closest(".drawCanvas")) return;
    if (!canvas) return;
    const { x, y } = getMousePosition(e.target.closest(".drawCanvas"), e);
    ctx.lineTo(x, y);
    ctx.moveTo(x, y);
    ctx.stroke();
}

function stopLine(e) {
    canvas = undefined;
}

textEditor.addEventListener("click", clearPageDrawings);

function clearPageDrawings(e) {
    if (!e.target.classList.contains("clearDrawingsBtn")) return;
    const pageCanvas = e.target
        .closest(".pageContainer")
        .querySelector(".drawCanvas");
    const newCtx = pageCanvas.getContext("2d");
    newCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
}
