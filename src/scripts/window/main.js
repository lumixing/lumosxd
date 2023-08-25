import _ from "underscore";
import { windowMoveMouseDown } from "./move";
import { windowResizeMouseDown } from "./resize";
import { addTaskbarApp, focusTaskbarApp, removeTaskbarApp, unfocusAllTaskbarApps } from "../taskbar/main";
// import image from "../../static/lumos.png";

let windowContainer = document.getElementById("window-container");

const defaultOptions = {
    title: "untitled window",
    body: "<p>unbodied window</p>",
    icon: null,
    movable: true,
    resizable: true,
    position: [100, 100],
    size: [600, 400],
    closable: true,
    minimizable: true,
    centerBody: false
};

export function createWindow(options) {
    options = _.defaults({}, _.clone(options), defaultOptions);

    let id = Math.random();
    let windowDiv = document.createElement("div");

    windowDiv.classList.add("window");

    windowDiv.dataset.id = id;
    windowDiv.innerHTML = /*html*/`
        <div class="head${!options.movable ? " no-move" : ""}">
            <div class="left">
                ${options.icon ? `<img src="${options.icon}" alt="icon">` : ""}
                <span class="title">${options.title}</span>
            </div>
            <div class="right">
                ${options.minimizable ? '<button class="minimize">_</button>' : ""}
                ${options.closable ? '<button class="close">x</button>' : ""}
            </div>
        </div>
        <div class="body">
            ${options.body}
        </div>
        ${options.resizable ? /*html*/`
        <div class="resize top-resize"></div>
        <div class="resize top-right-resize"></div>
        <div class="resize right-resize"></div>
        <div class="resize bottom-right-resize"></div>
        <div class="resize bottom-resize"></div>
        <div class="resize bottom-left-resize"></div>
        <div class="resize left-resize"></div>
        <div class="resize top-left-resize"></div>
        ` : ""}
    `;
    
    windowContainer.append(windowDiv);

    addTaskbarApp(options.title, id, options.icon);
    focusWindow(windowDiv);
    let windowHead = windowDiv.querySelector(".head");
    let windowBody = windowDiv.querySelector(".body");

    // window size
    windowDiv.style.width = `${options.size[0]}px`;
    windowDiv.style.height = `${options.size[1]}px`;

    // window position
    if (Array.isArray(options.position)) {
        windowDiv.style.left = `${options.position[0]}px`;
        windowDiv.style.top = `${options.position[1]}px`;
    }
    else if (options.position.toLowerCase() == "center") {
        windowDiv.style.left = `${~~(window.innerWidth / 2 - windowDiv.offsetWidth / 2)}px`;
        windowDiv.style.top = `${~~(window.innerHeight / 2 - windowDiv.offsetHeight / 2)}px`;
    }
    else if (options.position.toLowerCase() == "random") {
        windowDiv.style.left = `${~~(Math.random() * (window.innerWidth - windowDiv.offsetWidth))}px`;
        windowDiv.style.top = `${~~(Math.random() * (window.innerHeight - windowDiv.offsetHeight))}px`;
    }

    // window movement
    if (options.movable) {
        windowHead.addEventListener("mousedown", windowMoveMouseDown);
    }

    // window resizing
    if (options.resizable) {
        windowDiv.querySelectorAll(".resize").forEach(r => {
            r.addEventListener("mousedown", windowResizeMouseDown);
        });
    }

    windowDiv.addEventListener("mousedown", () => {
        focusWindow(windowDiv);
    });

    if (options.closable) {
        windowDiv.querySelector(".close").addEventListener("click", () => {
            closeWindow(windowDiv);
        });
    }

    if (options.minimizable) {
        windowDiv.querySelector(".minimize").addEventListener("click", () => {
            minimizeWindow(windowDiv);
        });
    }

    if (options.centerBody) {
        windowBody.classList.add("flex", "flex-center");
    }

    return windowDiv;
}

export function getWindowDiv(id) {
    return windowContainer.querySelector(`.window[data-id="${id}"]`);
}

export function focusWindow(windowDiv) {
    window.activeWindow = windowDiv;
    windowDiv.style.display = "flex";
    windowDiv.style.zIndex = ++window.zIndex;
    focusTaskbarApp(windowDiv.dataset.id);
}

export function closeWindow(windowDiv) {
    window.activeWindow = null;
    removeTaskbarApp(windowDiv.dataset.id);
    windowDiv.remove();
}

export function minimizeWindow(windowDiv) {
    window.activeWindow = null;
    windowDiv.style.display = "none";
    unfocusAllTaskbarApps();
}
