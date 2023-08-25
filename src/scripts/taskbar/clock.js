export function updateClock() {
    let clock = document.getElementById("clock");
    clock.innerText = Date.now();
}
