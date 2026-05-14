const stage = document.getElementById("stage");
const slides = Array.from(document.querySelectorAll(".slide"));
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");

let slideIndex = 0;
let fragmentIndex = -1;

function resizeStage() {
  const sx = window.innerWidth / 1366;
  const sy = window.innerHeight / 768;
  const scale = Math.min(sx, sy) * 0.965;
  document.documentElement.style.setProperty("--scale", scale.toFixed(4));
}

function currentFragments() {
  return Array.from(slides[slideIndex].querySelectorAll(".fragment"));
}

function setSlide(index) {
  slideIndex = Math.max(0, Math.min(slides.length - 1, index));
  fragmentIndex = -1;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === slideIndex);
    slide.classList.toggle("prev", i < slideIndex);
    slide.querySelectorAll(".fragment").forEach((fragment) => {
      fragment.classList.remove("visible", "current");
    });
  });

  counter.textContent = `${slideIndex + 1} / ${slides.length}`;
  progress.style.width = `${((slideIndex + 1) / slides.length) * 100}%`;
}

function revealNextFragment() {
  const fragments = currentFragments();
  if (!fragments.length || fragmentIndex >= fragments.length - 1) return false;

  fragmentIndex += 1;
  fragments.forEach((fragment, i) => {
    fragment.classList.toggle("visible", i <= fragmentIndex);
    fragment.classList.toggle("current", i === fragmentIndex);
  });
  return true;
}

function next() {
  if (revealNextFragment()) return;
  setSlide(slideIndex + 1);
}

function previous() {
  if (fragmentIndex >= 0) {
    fragmentIndex -= 1;
    const fragments = currentFragments();
    fragments.forEach((fragment, i) => {
      fragment.classList.toggle("visible", i <= fragmentIndex);
      fragment.classList.toggle("current", i === fragmentIndex);
    });
    return;
  }
  setSlide(slideIndex - 1);
}

window.addEventListener("resize", resizeStage);
document.addEventListener("keydown", (event) => {
  if (["ArrowRight", " ", "PageDown"].includes(event.key)) {
    event.preventDefault();
    next();
  }

  if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    previous();
  }

  if (event.key === "f" || event.key === "F") {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
});



document.querySelectorAll('.motivation-card').forEach((card) => {
  card.style.cursor = 'pointer';

  card.addEventListener('click', () => {
    if (card.dataset.animStopped === '1') return;

    const svg = card.querySelector('svg');
    if (svg && typeof svg.pauseAnimations === 'function') {
      svg.pauseAnimations();
      card.dataset.animStopped = '1';
      card.classList.add('anim-stopped');
    }
  });
});



resizeStage();
setSlide(0);
