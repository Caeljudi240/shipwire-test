const WORK = 25 * 60;
const BREAK = 5 * 60;

let remaining = WORK;
let phase = "work";
let timer = null;

const $time = document.getElementById("time");
const $phase = document.getElementById("phase");
const $start = document.getElementById("start");
const $reset = document.getElementById("reset");

function format(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function render() {
  $time.textContent = format(remaining);
  $phase.textContent = phase === "work" ? "Travail" : "Pause";
  $start.textContent = timer ? "Pause" : "Démarrer";
  document.title = `${format(remaining)} · Tomate`;
}

function tick() {
  remaining -= 1;
  if (remaining <= 0) {
    phase = phase === "work" ? "break" : "work";
    remaining = phase === "work" ? WORK : BREAK;
  }
  render();
}

function toggle() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  } else {
    timer = setInterval(tick, 1000);
  }
  render();
}

$start.addEventListener("click", toggle);

// Space bar starts / pauses the timer.
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && e.target === document.body) {
    e.preventDefault();
    toggle();
  }
});

$reset.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  phase = "work";
  remaining = WORK;
  render();
});

render();
