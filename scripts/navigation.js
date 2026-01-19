const hamburger = document.getElementById("hamburger");
const navUl = document.querySelector(".navigation ul");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navUl.classList.toggle("open");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 767) {
    navUl.classList.remove("open");
    hamburger.classList.remove("open");
  }
});