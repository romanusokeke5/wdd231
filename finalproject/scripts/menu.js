const btn = document.getElementById('menuBtn');
const nav = document.getElementById('primaryNav');

btn.addEventListener('click', () => {
  nav.classList.toggle('open');
  // Wayfinding for accessibility
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !expanded);
});