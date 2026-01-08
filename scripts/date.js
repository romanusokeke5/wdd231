document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#currentyear').textContent = new Date().getFullYear();
  document.querySelector('#lastModified').textContent = document.lastModified;
});