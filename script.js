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