const body = document.body;
const themeButton = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');

document.querySelector('#year').textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') body.classList.add('dark');
themeButton.setAttribute('aria-label', body.classList.contains('dark') ? 'Switch to light theme' : 'Switch to dark theme');
themeButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  const dark = body.classList.contains('dark');
  localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
});

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  mobileNav.hidden = isOpen;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
} else document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));

const navLinks = [...document.querySelectorAll('.nav-links a')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    }
  }), { rootMargin: '-35% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}

const tiltCard = document.querySelector('[data-tilt]');
if (tiltCard && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
  const visual = tiltCard.closest('.hero-visual');
  visual.addEventListener('pointermove', event => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 8}deg)`;
  });
  visual.addEventListener('pointerleave', () => { tiltCard.style.transform = ''; });
}

