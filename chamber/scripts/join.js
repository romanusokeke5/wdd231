document.addEventListener("DOMContentLoaded", () => {
  const timestampField = document.getElementById("timestamp");

  if (timestampField) {
    const now = new Date();
    timestampField.value = now.toLocaleString();
  }
  
});
// join.js
document.addEventListener("DOMContentLoaded", () => {

  // OPEN MODALS
  document.querySelectorAll(".open-modal").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const modalId = link.dataset.modal;
      document.getElementById(modalId).showModal();
    });
  });

  // CLOSE MODALS
  document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest("dialog").close();
    });
  });

});

