export function openModal(modalId, contentHTML) {
  const dialog = document.getElementById(modalId);
  const contentDiv = document.getElementById('modalContent');
  if (dialog && contentDiv) {
    contentDiv.innerHTML = contentHTML;
    dialog.showModal();
  }
}