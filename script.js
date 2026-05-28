const burger = document.querySelector('.burger');
const nav = document.querySelector('.main-nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.classList.toggle('is-active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.classList.remove('is-active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

const topButton = document.querySelector('[data-scroll-top]');
if (topButton) {
  topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const forms = document.querySelectorAll('form');
forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
  });
});