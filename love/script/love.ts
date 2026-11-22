// Fills the background with hearts: a burst from the centre when the page
// opens, then a gentle stream drifting up from the bottom.

const layer = document.querySelector<HTMLElement>(".hearts");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const colors = ["#e0446a", "#f06b8b", "#f6a6b8", "#ff8fa3", "#c9184a"];

function random(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

function pick<T>(items: readonly T[]): T {
    return items[Math.floor(Math.random() * items.length)] as T;
}

function makeHeart(className: string, size: number): HTMLSpanElement {
    const heart = document.createElement("span");
    heart.className = className;
    heart.textContent = "♥";
    heart.style.fontSize = `${size}px`;
    heart.style.color = pick(colors);
    heart.addEventListener("animationend", () => heart.remove());
    return heart;
}

function burst(target: HTMLElement): void {
    const count = 36;
    const reach = Math.max(window.innerWidth, window.innerHeight) * 0.6;
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + random(-0.15, 0.15);
        const distance = random(reach * 0.35, reach);
        const heart = makeHeart("burst", random(14, 38));
        heart.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
        heart.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
        heart.style.setProperty("--rot", `${random(-90, 90)}deg`);
        heart.style.setProperty("--dur", `${random(1.4, 2.4)}s`);
        heart.style.setProperty("--delay", `${random(0, 0.35)}s`);
        target.appendChild(heart);
    }
}

function floatOne(target: HTMLElement): void {
    const heart = makeHeart("float", random(12, 34));
    heart.style.left = `${random(0, 100)}%`;
    heart.style.setProperty("--sway", `${random(-60, 60)}px`);
    heart.style.setProperty("--rot", `${random(-40, 40)}deg`);
    heart.style.setProperty("--dur", `${random(7, 13)}s`);
    heart.style.setProperty("--alpha", `${random(0.35, 0.8)}`);
    target.appendChild(heart);
}

if (layer && !reduceMotion) {
    burst(layer);

    // Start the drifting hearts as the burst fades, and pause while the tab is hidden.
    let timer: number | undefined;
    const start = (): void => {
        if (timer === undefined) {
            timer = window.setInterval(() => floatOne(layer), 450);
        }
    };
    const stop = (): void => {
        window.clearInterval(timer);
        timer = undefined;
    };

    window.setTimeout(start, 1200);
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stop();
        } else {
            start();
        }
    });
}
