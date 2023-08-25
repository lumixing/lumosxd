import { closeWindow, focusWindow, getWindowDiv, minimizeWindow } from "../window/main";
import { updateClock } from "./clock";

let taskbarAppContainer = document.getElementById("taskbar-app-container")

export function addTaskbarApp(name, id, icon = null, focus = true) {
    let appDiv = document.createElement("button");
    
    appDiv.classList.add("taskbar-app");
    appDiv.dataset.id = id;
    appDiv.innerHTML = /*html*/`
        ${icon ? `<img src=${icon} alt="icon" draggable="false">` : ""}
        <span>${name}</span>  
    `;

    taskbarAppContainer.append(appDiv);

    appDiv.addEventListener("mousedown", (e) => clickHandler(e, id));

    if (focus) focusTaskbarApp(id);
}

function clickHandler(e, id) {
    if (e.button == 1) {
        closeWindow(getWindowDiv(id));
    } else {
        if (e.target.closest(".taskbar-app").classList.contains("focused")) {
            minimizeWindow(getWindowDiv(id));
        } else {
            focusWindow(getWindowDiv(id));
        }
    }
}

export function removeTaskbarApp(id) {
    taskbarAppContainer.querySelector(`.taskbar-app[data-id="${id}"]`).remove();
}

export function focusTaskbarApp(id) {
    let appDiv = taskbarAppContainer.querySelector(`.taskbar-app[data-id="${id}"]`);
    unfocusAllTaskbarApps();
    appDiv.classList.add("focused");
}

export function unfocusAllTaskbarApps() {
    taskbarAppContainer.querySelectorAll(".taskbar-app").forEach(e => {
        e.classList.remove("focused");
    });
}

export function updateTray() {
    updateClock();
}
