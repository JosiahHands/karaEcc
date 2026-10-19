// Each notes picture (and the footer video) starts hidden; its button toggles it.
const toggleButtons = document.querySelectorAll<HTMLButtonElement>(".toggle");

for (const button of toggleButtons) {
    const targetId = button.getAttribute("aria-controls");
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) continue;

    // Button text is written as "Show ..." in the HTML; swap the first word when toggled.
    const showText = button.textContent ?? "";
    const hideText = showText.replace(/^Show/, "Hide");

    button.addEventListener("click", () => {
        const showing = target.hidden;
        target.hidden = !showing;
        button.setAttribute("aria-expanded", String(showing));
        button.textContent = showing ? hideText : showText;

        if (!showing && target instanceof HTMLMediaElement) target.pause();
    });
}
