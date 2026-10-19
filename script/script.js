"use strict";
// Each notes picture (and the footer video) starts hidden; its button toggles it.
const toggleButtons = document.querySelectorAll(".toggle");
for (const button of toggleButtons) {
    const targetId = button.getAttribute("aria-controls");
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target)
        continue;
    // Button text is written as "Show ..." in the HTML; swap the first word when toggled.
    const showText = button.textContent ?? "";
    const hideText = showText.replace(/^Show/, "Hide");
    const video = target instanceof HTMLVideoElement ? target : target.querySelector("video");
    button.addEventListener("click", () => {
        const showing = target.hidden;
        target.hidden = !showing;
        button.setAttribute("aria-expanded", String(showing));
        button.textContent = showing ? hideText : showText;
        if (!showing)
            video?.pause();
    });
}
// Big play button over each video while it's paused; pause button at the bottom while it plays.
const videoWraps = document.querySelectorAll(".video-wrap");
for (const wrap of videoWraps) {
    const video = wrap.querySelector("video");
    const playButton = wrap.querySelector(".video-play");
    const pauseButton = wrap.querySelector(".video-pause");
    if (!video || !playButton || !pauseButton)
        continue;
    const syncButtons = () => {
        playButton.hidden = !video.paused;
        pauseButton.hidden = video.paused;
    };
    video.addEventListener("play", syncButtons);
    video.addEventListener("pause", syncButtons);
    video.addEventListener("ended", syncButtons);
    playButton.addEventListener("click", () => {
        video.play().catch(syncButtons);
    });
    pauseButton.addEventListener("click", () => {
        video.pause();
    });
    syncButtons();
}
//# sourceMappingURL=script.js.map