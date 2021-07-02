import "regenerator-runtime/runtime.js";
import { fontObj } from "./config.js";

const state = {
    currentPage: document.querySelector(".page"),
    totalPages: 1,
    editMode: "write",
    ruled: true,
    margin: true,
    inkColor: "black",
    increaseTotalPages() {
        this.totalPages++;
    },
    updateCurrentPage(page) {
        this.currentPage = page;
    },
    currentFontUrl: fontObj["Default"],
};

export { state };
