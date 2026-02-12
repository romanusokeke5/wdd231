import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discoverGrid");
const dialog = document.querySelector("#learnMoreDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogContent = document.querySelector("#dialogContent");
const closeDialog = document.querySelector("#closeDialog");

try {
  places.forEach((place) => {
    const card = document.createElement("section");
    card.classList.add("discover-card");

    card.innerHTML = `
      <figure>
        <img src="${place.image}" alt="${place.name}" loading="lazy" width="400" height="250">
      </figure>
      <div class="content">
        <h3>${place.name}</h3>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button type="button" class="learn-btn">Learn More</button>
      </div>
    `;

    const button = card.querySelector(".learn-btn");
    button.addEventListener("click", () => {
      dialogTitle.textContent = place.name;
      dialogContent.textContent = place.longDescription;
      dialog.showModal();
    });

    grid.appendChild(card);
  });

} catch (error) {
  console.error("Error loading places:", error);
}

/* Close modal */
closeDialog.addEventListener("click", () => {
  dialog.close();
});

/* VISIT MESSAGE */
const visitMessage = document.querySelector("#visitMessage");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / 86400000);

  visitMessage.textContent =
    days < 1
      ? "Back so soon! Awesome!"
      : days === 1
      ? "You last visited 1 day ago."
      : `You last visited ${days} days ago.`;
}

localStorage.setItem("lastVisit", now);
