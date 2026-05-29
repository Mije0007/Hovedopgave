const burger = document.querySelector(".burger");
const nav = document.querySelector(".main-nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    burger.classList.toggle("is-active", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.classList.remove("is-active");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

const topButton = document.querySelector("[data-scroll-top]");
if (topButton) {
  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
  });
});
/* ============================= */
/* Scroll-animation til eksisterende øldåser */
/* ============================= */

(() => {
  const beers = document.querySelectorAll(".scroll-beer");

  if (!beers.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (prefersReducedMotion || isMobile) {
    beers.forEach((beer) => {
      beer.style.opacity = "1";
      beer.style.transform = "none";
      beer.style.filter = "none";
    });
    return;
  }

  let ticking = false;

  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  const lerp = (start, end, progress) => {
    return start + (end - start) * progress;
  };

  const smoothstep = (edge1, edge2, value) => {
    const x = clamp((value - edge1) / (edge2 - edge1), 0, 1);
    return x * x * (3 - 2 * x);
  };

  function animateBeers() {
    const viewportHeight = window.innerHeight;

    beers.forEach((beer) => {
      const parentSection =
        beer.closest(".hero") ||
        beer.closest(".feature-row") ||
        beer.closest(".bottom-cta") ||
        beer.parentElement;

      const rect = parentSection.getBoundingClientRect();

      /*
        Progress:
        0 = sektionen er ikke kommet ind endnu
        0.5 = sektionen er omkring midten af viewport
        1 = sektionen er næsten ude igen
      */
      const progress = clamp(
        (viewportHeight - rect.top) / (viewportHeight + rect.height),
        0,
        1
      );

      const rotateStart = Number(beer.dataset.rotateStart || -12);
      const rotateEnd = Number(beer.dataset.rotateEnd || 8);
      const xStart = Number(beer.dataset.xStart || 0);
      const yStart = Number(beer.dataset.yStart || 60);
      const scaleStart = Number(beer.dataset.scaleStart || 0.9);
      const scaleEnd = Number(beer.dataset.scaleEnd || 1);

      const isFinal = beer.classList.contains("final-scroll-beer");

      const enter = smoothstep(0.08, 0.42, progress);
      const exit = isFinal ? 0 : smoothstep(0.72, 0.96, progress);

      const visibility = clamp(enter - exit, 0, 1);

      const x = lerp(xStart, 0, enter);
      const y = lerp(yStart, 0, enter) - exit * 70;
      const rotate =
        lerp(rotateStart, rotateEnd, enter) + exit * (rotateEnd > 0 ? 14 : -14);
      const scale = lerp(scaleStart, scaleEnd, enter) - exit * 0.08;

      beer.style.opacity = visibility.toFixed(3);
      beer.style.transform = `
        translate3d(${x}px, ${y}px, 0)
        rotate(${rotate}deg)
        scale(${scale})
      `;

      beer.classList.toggle("scroll-active", visibility > 0.55);
      beer.classList.toggle(
        "scroll-soft",
        visibility > 0.05 && visibility < 0.45
      );
    });

    ticking = false;
  }

  function requestAnimation() {
    if (!ticking) {
      window.requestAnimationFrame(animateBeers);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestAnimation, { passive: true });
  window.addEventListener("resize", requestAnimation);

  animateBeers();
})();
