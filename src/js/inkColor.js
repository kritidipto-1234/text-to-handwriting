const availableColorSelector = document.querySelector(
    ".availableColorSelector"
);
const textEditor = document.querySelector(".textEditor");
import { state } from "./state.js";

availableColorSelector.addEventListener("input", function (e) {
    textEditor.style.color = `${e.target.value}`;
    state.inkColor = e.target.value;
});
