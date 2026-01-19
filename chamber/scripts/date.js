const yearSpan = document.getElementById("currentYear");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const modifiedSpan = document.getElementById("lastModified");
if (modifiedSpan) modifiedSpan.textContent = document.lastModified;