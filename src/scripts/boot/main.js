console.log("booted!")

import { updateTray } from "../taskbar/main";
import { createWindow } from "../window/main";
//import { shortcutHandler } from "./shortcuts";

window.activeWindow = null;
window.zIndex = 10;

createWindow({});

//shortcutHandler();

// pls fix this
//import(`../apps/about`).then(e => e.launch());

setInterval(() => {
    updateTray();
}, 100);
