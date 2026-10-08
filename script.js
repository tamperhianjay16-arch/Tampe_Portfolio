/* ============================================================
   MY_PORTFOLIO — script.js
   ============================================================ */

"use strict";

/* ---------- Typing effect in hero ---------- */
const roles = ["BSIT Student", "Future Web Developer", "USTP CDO Student", "Problem Solver"];
const typeEl = document.getElementById("typewriter");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = roles[roleIndex];

  if (!deleting) {
    typeEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800); // pause at full word
      return;
    }
    setTimeout(type, 80);
  } else {
    typeEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(type, 45);
  }
}
type();

/* ---------- Mobile menu toggle ---------- */
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});

// Close the menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- Active nav link highlighting ---------- */
const sections = document.querySelectorAll("section[id], header[id]");
const navAnchors = document.querySelectorAll(".nav__link");

function highlightNav() {
  const scrollPos = window.scrollY + 120;
  let currentId = "";

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.classList.toggle("active", anchor.getAttribute("href") === `#${currentId}`);
  });
}

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));

window.addEventListener("scroll", highlightNav, { passive: true });

/* ---------- Fun fact shuffler ---------- */
const funFacts = [
  { emoji: "🤯", text: "I can spend 3 hours debugging... only to find a missing semicolon." },
  { emoji: "🎧", text: "My coding playlist is 90% lofi — the official soundtrack to 'fix the bug' hours." },
  { emoji: "🗣️", text: "I speak three languages: English, Bisaya, and 'why won't this div center?'" },
  { emoji: "📶", text: "My superhero power is finding free Wi-Fi anywhere in CDO." },
  { emoji: "☕", text: "One day I'm building my portfolio, the next I'm praying the code compiles." },
];

const funFactBtn = document.getElementById("funfact-btn");
const funFactText = document.getElementById("funfact-text");
const funFactEmoji = document.getElementById("funfact-emoji");
let lastFactIndex = -1;

function randomFact() {
  let index;
  do {
    index = Math.floor(Math.random() * funFacts.length);
  } while (index === lastFactIndex);

  lastFactIndex = index;
  funFactEmoji.textContent = funFacts[index].emoji;
  funFactText.textContent = funFacts[index].text;
}

// Show the first random fun fact on load
randomFact();

funFactBtn.addEventListener("click", randomFact);

/* ---------- Contact form -> mailto ---------- */
const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:tamperhian@gmail.com?subject=${subject}&body=${body}`;

  // Feedback note
  const note = document.createElement("p");
  note.className = "form-note";
  note.textContent = "Opening your email app… 🚀";
  if (!form.querySelector(".form-note")) form.appendChild(note);

  form.reset();
});

/* ---------- Auto-update footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ============================================================
   GALAXY BACKGROUND — twinkling starfield + shooting stars
   ============================================================ */
(function galaxy() {
  const canvas = document.getElementById("galaxy");
  const flavorHost = document.getElementById("code-flakes");
  if (!canvas || typeof window.matchMedia === "undefined") return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");
  const COLORS = ["#ffffff", "#cdd6ff", "#ffe9c9", "#9ee7ff"];

  let stars = [];
  let shooting = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
  }

  function buildStars() {
    const count = Math.min(320, Math.floor((W * H) / 5500));
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.3 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.6,
        depth: 0.25 + Math.random() * 0.75, // brightness factor
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
  }

  function spawnShootingStar() {
    shooting.push({
      x: Math.random() * W * 0.6 + W * 0.2,
      y: Math.random() * H * 0.25,
      vx: -(4 + Math.random() * 4),
      vy: 2.5 + Math.random() * 2.5,
      life: 1,
    });
  }

  let lastShot = 0;
  function tick(time) {
    ctx.clearRect(0, 0, W, H);

    // Stars (twinkle)
    const t = time * 0.001;
    for (const s of stars) {
      const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
      ctx.globalAlpha = s.depth * twinkle;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Shooting stars
    if (time - lastShot > 3500 + Math.random() * 3500) {
      lastShot = time;
      spawnShootingStar();
    }
    shooting = shooting.filter((s) => s.life > 0);
    for (const s of shooting) {
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.985;
      s.vy *= 0.985;
      s.life -= 0.012;

      const tailX = s.x - s.vx * 12;
      const tailY = s.y - s.vy * 12;
      const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255,255,255,${0.9 * s.life})`);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
    }

    if (!reduceMotion) requestAnimationFrame(tick);
  }

  if (reduceMotion) {
    // Static starfield (no animation)
    resize();
    for (const s of stars) {
      ctx.globalAlpha = s.depth * 0.7;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  } else {
    resize();
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);

  /* ---- Floating code flakes ---- */
  const GLYPHS = ["</>", "{ }", "=>", "::", ";", "<div>", "()", "[ ]", "&&", "fn()", "if()", "0,1", "#js", "console.log()"];
  if (flavorHost && !reduceMotion) {
    for (let i = 0; i < 18; i++) {
      const span = document.createElement("span");
      span.className = "code-flake";
      span.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      span.style.left = `${Math.random() * 100}%`;
      span.style.fontSize = `${0.7 + Math.random() * 1.5}rem`;
      span.style.setProperty("--dur", `${14 + Math.random() * 18}s`);
      span.style.setProperty("--delay", `${-Math.random() * 30}s`);
      span.style.setProperty("--op", `${0.12 + Math.random() * 0.25}`);
      flavorHost.appendChild(span);
    }
  } else if (flavorHost && reduceMotion) {
    for (let i = 0; i < 10; i++) {
      const span = document.createElement("span");
      span.className = "code-flake";
      span.textContent = GLYPHS[i % GLYPHS.length];
      span.style.left = `${Math.random() * 92}%`;
      span.style.top = `${Math.random() * 90}%`;
      span.style.animation = "none";
      span.style.opacity = "0.22";
      flavorHost.appendChild(span);
    }
  }
})();