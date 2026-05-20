const startDate = new Date("2024-12-14T00:00:00+08:00");
const today = new Date();
const dayMs = 24 * 60 * 60 * 1000;
const daysTogether = Math.max(1, Math.floor((today - startDate) / dayMs) + 1);

document.getElementById("daysTogether").textContent = daysTogether;

const photos = window.LOVE_PHOTOS || [];
let activeIndex = 0;
let autoTimer = null;

const stage = document.getElementById("photoStage");
const image = document.getElementById("currentPhoto");
const photoDate = document.getElementById("photoDate");
const photoTitle = document.getElementById("photoTitle");
const photoText = document.getElementById("photoText");
const dots = document.getElementById("photoDots");

function renderDots() {
  dots.innerHTML = "";
  photos.forEach((photo, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `查看照片：${photo.title}`);
    dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    dot.addEventListener("click", () => showPhoto(index, true));
    dots.appendChild(dot);
  });
}

function showPhoto(index, resetTimer = false) {
  if (!photos.length) return;

  activeIndex = (index + photos.length) % photos.length;
  const photo = photos[activeIndex];

  stage.classList.add("is-switching");
  window.setTimeout(() => {
    image.src = photo.src;
    image.alt = photo.alt || photo.title;
    stage.style.setProperty("--photo-bg", `url("${photo.src}")`);
    photoDate.textContent = photo.date;
    photoTitle.textContent = photo.title;
    photoText.textContent = photo.text;
    renderDots();
    stage.classList.remove("is-switching");
  }, 180);

  if (resetTimer) startAutoPlay();
}

function startAutoPlay() {
  window.clearInterval(autoTimer);
  autoTimer = window.setInterval(() => showPhoto(activeIndex + 1), 5200);
}

document.getElementById("prevPhoto").addEventListener("click", () => showPhoto(activeIndex - 1, true));
document.getElementById("nextPhoto").addEventListener("click", () => showPhoto(activeIndex + 1, true));

showPhoto(0);
startAutoPlay();

const canvas = document.getElementById("constellation");
const ctx = canvas.getContext("2d");
let points = [];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  points = Array.from({ length: Math.min(72, Math.floor(window.innerWidth / 18)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
  }));
}

function drawConstellation() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "rgba(16, 24, 32, 0.28)";
  ctx.strokeStyle = "rgba(16, 24, 32, 0.12)";

  points.forEach((point, index) => {
    point.x += point.vx;
    point.y += point.vy;

    if (point.x < 0 || point.x > window.innerWidth) point.vx *= -1;
    if (point.y < 0 || point.y > window.innerHeight) point.vy *= -1;

    ctx.beginPath();
    ctx.arc(point.x, point.y, 1.6, 0, Math.PI * 2);
    ctx.fill();

    for (let next = index + 1; next < points.length; next += 1) {
      const target = points[next];
      const distance = Math.hypot(point.x - target.x, point.y - target.y);
      if (distance < 125) {
        ctx.globalAlpha = 1 - distance / 125;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  });

  requestAnimationFrame(drawConstellation);
}

resizeCanvas();
drawConstellation();
window.addEventListener("resize", resizeCanvas);
