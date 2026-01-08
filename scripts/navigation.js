const hambutton = document.querySelector('#menu');
const mainnav = document.querySelector('#primarynav');

hambutton.addEventListener('click', () => {
  mainnav.classList.toggle('open');
  hambutton.classList.toggle('open');
  const expanded = hambutton.getAttribute('aria-expanded') === 'true';
  hambutton.setAttribute('aria-expanded', !expanded);
});

// Wayfinding: Highlight active page
document.querySelectorAll('nav a').forEach(link => {
  if (link.getAttribute('href') === window.location.pathname.split('/').pop() || 
      (window.location.pathname === '/' && link.textContent.trim() === 'Home')) {
    link.classList.add('active');
  }
});