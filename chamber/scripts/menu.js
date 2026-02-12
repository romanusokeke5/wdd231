// menu.js

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamButton.classList.toggle('open');
});
const btn = document.querySelector("#menuBtn");
const nav = document.querySelector("#primaryNav");

btn.addEventListener("click", () => {
  nav.classList.toggle("open");

  const expanded = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", !expanded);
});

