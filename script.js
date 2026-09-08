const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".reveal, .reveal-down")
  .forEach((element) => revealObserver.observe(element));

const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateActiveNavigation() {
  const marker = window.scrollY + window.innerHeight * 0.32;
  let activeSection = navSections[0];

  navSections.forEach((section) => {
    if (marker >= section.offsetTop) activeSection = section;
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeSection.id}`;
    link.classList.toggle("active", isActive);
  });
}

const gradients = [
  "radial-gradient(circle at 18% 20%, rgba(37,99,235,.50), transparent 45%), radial-gradient(circle at 82% 30%, rgba(139,92,246,.30), transparent 42%), linear-gradient(180deg,#030509,#07111f)",
  "radial-gradient(circle at 20% 65%, rgba(6,182,212,.33), transparent 45%), radial-gradient(circle at 78% 20%, rgba(37,99,235,.27), transparent 42%), linear-gradient(180deg,#030914,#061522)",
  "radial-gradient(circle at 14% 35%, rgba(14,165,233,.34), transparent 45%), radial-gradient(circle at 84% 72%, rgba(99,102,241,.28), transparent 42%), linear-gradient(180deg,#030712,#071020)",
  "radial-gradient(circle at 68% 20%, rgba(139,92,246,.34), transparent 45%), radial-gradient(circle at 18% 72%, rgba(6,182,212,.24), transparent 42%), linear-gradient(180deg,#070511,#0b0718)",
  "radial-gradient(circle at 28% 50%, rgba(30,58,138,.38), transparent 45%), radial-gradient(circle at 80% 30%, rgba(51,65,85,.33), transparent 42%), linear-gradient(180deg,#020509,#050b18)"
];

const pageSections = Array.from(document.querySelectorAll("main > section"));
let lastGradientIndex = -1;

function updateBackground() {
  const marker = window.scrollY + window.innerHeight * 0.4;
  let activeIndex = 0;

  pageSections.forEach((section, index) => {
    if (marker >= section.offsetTop) activeIndex = index;
  });

  if (activeIndex !== lastGradientIndex) {
    lastGradientIndex = activeIndex;
    document.body.style.background =
      gradients[activeIndex] || gradients[gradients.length - 1];
  }
}

function onScroll() {
  updateActiveNavigation();
  updateBackground();
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

onScroll();
