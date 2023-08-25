let x = 0;
let y = 0;

export function windowMoveMouseDown(e) {
    x = e.clientX;
    y = e.clientY;

    window.activeWindow = e.target.closest(".window");

    document.addEventListener("mousemove", windowMoveMouseMove);
    document.addEventListener("mouseup", windowMoveMouseUp);
}

function windowMoveMouseMove(e) {
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    let activeWindow = window.activeWindow;

    if (e.clientX > 0 && e.clientX < window.innerWidth) {
        activeWindow.style.left = `${activeWindow.offsetLeft + dx}px`;
    }

    if (e.clientY > 0 && e.clientY < window.innerHeight) {
        activeWindow.style.top = `${activeWindow.offsetTop + dy}px`;
    }

    x = e.clientX;
    y = e.clientY;
}

function windowMoveMouseUp() {
    document.removeEventListener("mousemove", windowMoveMouseMove);
    document.removeEventListener("mouseup", windowMoveMouseUp);
}
