const unlockForm = document.getElementById("unlockForm");
const unlockCode = document.getElementById("unlockCode");
const unlockHint = document.getElementById("unlockHint");
const unlockOverlay = document.getElementById("unlockOverlay");
const answer = "1214";

unlockCode.focus();

unlockCode.addEventListener("input", () => {
  unlockCode.value = unlockCode.value.replace(/\D/g, "").slice(0, 4);
  unlockHint.textContent = "提示：我们在一起的日期。";
  unlockHint.classList.remove("is-error");
});

unlockForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (unlockCode.value === answer) {
    unlockOverlay.classList.add("is-visible");
    unlockOverlay.setAttribute("aria-hidden", "false");
    window.setTimeout(() => {
      window.location.href = "index.html?from=unlock";
    }, 1500);
    return;
  }

  unlockHint.textContent = "还差一点点：想想 2024 年冬天，我们故事开始的月和日。";
  unlockHint.classList.add("is-error");
  unlockCode.select();
});

const canvas = document.getElementById("constellation");
const ctx = canvas.getContext("2d");
let sparks = [];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  sparks = Array.from({ length: Math.min(80, Math.floor(window.innerWidth / 16)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.8 + 0.6,
    a: Math.random() * Math.PI * 2,
  }));
}

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  sparks.forEach((spark, index) => {
    spark.a += 0.01;
    const x = spark.x + Math.cos(spark.a) * 6;
    const y = spark.y + Math.sin(spark.a) * 6;

    ctx.fillStyle = "rgba(216, 179, 106, 0.55)";
    ctx.beginPath();
    ctx.arc(x, y, spark.r, 0, Math.PI * 2);
    ctx.fill();

    const next = sparks[(index + 7) % sparks.length];
    const distance = Math.hypot(x - next.x, y - next.y);
    if (distance < 155) {
      ctx.strokeStyle = `rgba(216, 179, 106, ${0.18 * (1 - distance / 155)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(next.x, next.y);
      ctx.stroke();
    }
  });
  requestAnimationFrame(draw);
}

resizeCanvas();
draw();
window.addEventListener("resize", resizeCanvas);

