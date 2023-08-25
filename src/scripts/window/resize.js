let x = 0;
let y = 0;
let windowResize = null;

export function windowResizeMouseDown(e) {
    x = e.clientX;
    y = e.clientY;

    windowResize = e.target;

    document.addEventListener("mousemove", windowResizeMouseMove);
    document.addEventListener("mouseup", windowResizeMouseUp);
}

function windowResizeMouseMove(e) {
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    let windowDiv = windowResize.closest(".window");
    const PADDING = 2 * 2;

    if (windowResize.classList.value.includes("top")) {
        windowDiv.style.height = `${windowDiv.offsetHeight - dy - PADDING}px`;
        if (windowDiv.offsetHeight - dy - PADDING > 99) {
            windowDiv.style.top = `${windowDiv.offsetTop + dy}px`;
        }
    }
    if (windowResize.classList.value.includes("left")) {
        windowDiv.style.width = `${windowDiv.offsetWidth - dx - PADDING}px`;
        if (windowDiv.offsetWidth - dx - PADDING > 99) {
            windowDiv.style.left = `${windowDiv.offsetLeft + dx}px`;
        }
    }
    if (windowResize.classList.value.includes("right")) {
        windowDiv.style.width = `${windowDiv.offsetWidth + dx - PADDING}px`;
    }
    if (windowResize.classList.value.includes("bottom")) {
        windowDiv.style.height = `${windowDiv.offsetHeight + dy - PADDING}px`;
    }

    x = e.clientX;
    y = e.clientY;
}

function windowResizeMouseUp() {
    windowResize = null;

    document.removeEventListener("mousemove", windowResizeMouseMove);
    document.removeEventListener("mouseup", windowResizeMouseUp);
}
