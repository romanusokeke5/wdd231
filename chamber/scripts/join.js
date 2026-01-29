document.addEventListener("DOMContentLoaded", () => {
  const timestampField = document.getElementById("timestamp");

  if (timestampField) {
    const now = new Date();
    timestampField.value = now.toLocaleString();
  }
});
