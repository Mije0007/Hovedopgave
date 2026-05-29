/* ============================= */
/* Burgermenu */
/* ============================= */

const burger = document.querySelector(".burger");
const mainNav = document.querySelector(".main-nav");

if (burger && mainNav) {
  burger.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");

    burger.classList.toggle("is-active", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  const navLinks = mainNav.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      burger.classList.remove("is-active");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

/* ============================= */
/* Smooth scroll til interne links */
/* ============================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    event.preventDefault();

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

/* ============================= */
/* Til toppen-knap */
/* ============================= */

const topButton = document.querySelector(".to-top");

if (topButton) {
  topButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* ============================= */
/* Reveal animation */
/* ============================= */

const revealElements = document.querySelectorAll(
  ".reveal-left, .reveal-right, .reveal-up"
);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}
