"use strict";
// Sends hearts floating up the background, a few at a time.
const layer = document.querySelector(".hearts");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const colors = ["#e0446a", "#f06b8b", "#f6a6b8"];
function random(min, max) {
    return min + Math.random() * (max - min);
}
function floatHeart(target) {
    const heart = document.createElement("span");
    heart.textContent = "♥";
    heart.style.left = `${random(0, 95)}%`;
    heart.style.fontSize = `${random(14, 30)}px`;
    heart.style.color = colors[Math.floor(Math.random() * colors.length)] ?? "#e0446a";
    heart.style.setProperty("--dur", `${random(8, 12)}s`);
    heart.addEventListener("animationend", () => heart.remove());
    target.appendChild(heart);
}
if (layer && !reduceMotion) {
    // A handful right away so the page opens with hearts, then a steady trickle.
    for (let i = 0; i < 6; i++) {
        window.setTimeout(() => floatHeart(layer), i * 150);
    }
    window.setInterval(() => {
        if (!document.hidden) {
            floatHeart(layer);
        }
    }, 800);
}
//# sourceMappingURL=love.js.map