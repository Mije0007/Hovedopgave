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
/* ============================= */
/* Bryggerier filter */
/* ============================= */

const beerCards = document.querySelectorAll(".beer-card");
const mainFilterButtons = document.querySelectorAll(".filter-main-btn");
const filterSubpanels = document.querySelectorAll(".filter-subpanel");
const filterSubButtons = document.querySelectorAll(".filter-sub-btn");

if (
  beerCards.length > 0 &&
  mainFilterButtons.length > 0 &&
  filterSubpanels.length > 0 &&
  filterSubButtons.length > 0
) {
  function showPanel(panelName) {
    filterSubpanels.forEach((panel) => {
      const isActive = panel.dataset.subpanel === panelName;
      panel.classList.toggle("active", isActive);
    });

    mainFilterButtons.forEach((button) => {
      const isActive = button.dataset.panel === panelName;
      button.classList.toggle("active", isActive);
    });
  }

  function setActiveSubButton(clickedButton) {
    const activePanel = clickedButton.closest(".filter-subpanel");

    if (!activePanel) return;

    activePanel.querySelectorAll(".filter-sub-btn").forEach((button) => {
      button.classList.remove("active");
    });

    clickedButton.classList.add("active");
  }

  function filterCards(group, value) {
    beerCards.forEach((card) => {
      card.classList.add("is-filtering");
    });

    window.setTimeout(() => {
      beerCards.forEach((card) => {
        const cardValue =
          group === "brewery" ? card.dataset.brewery : card.dataset.type;

        const shouldShow = value === "all" || cardValue === value;

        card.classList.toggle("is-hidden", !shouldShow);

        if (shouldShow) {
          requestAnimationFrame(() => {
            card.classList.remove("is-filtering");
          });
        }
      });
    }, 180);
  }

  mainFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const panelName = button.dataset.panel;

      showPanel(panelName);

      const activePanel = document.querySelector(
        `.filter-subpanel[data-subpanel="${panelName}"]`
      );

      const allButton = activePanel?.querySelector('[data-filter="all"]');

      if (allButton) {
        setActiveSubButton(allButton);
        filterCards(panelName, "all");
      }
    });
  });

  filterSubButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.dataset.filterGroup;
      const value = button.dataset.filter;

      setActiveSubButton(button);
      filterCards(group, value);
    });
  });
}
