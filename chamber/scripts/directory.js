const membersContainer = document.getElementById("members");
const errorEl = document.getElementById("directoryError");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

const DATA_URL = "data/members.json";
const STORAGE_KEY = "directoryView"; // optional: remember view choice

function membershipLabel(level) {
  switch (Number(level)) {
    case 3: return "Gold Member";
    case 2: return "Silver Member";
    default: return "Member";
  }
}

function renderMembers(members) {
  // Render cards with template literals (clean + rubric-friendly)
  membersContainer.innerHTML = members.map(m => `
    <article class="member-card">
      <div class="member-header">
        <img
          class="member-logo"
          src="images/members/${m.image}"
          alt="${m.name} logo"
          loading="lazy"
          width="70"
          height="70"
        />
        <div>
          <h3>${m.name}</h3>
          <p class="member-meta">${m.tagline ?? ""}</p>
        </div>
      </div>

      <p class="member-meta"><strong>Address:</strong> ${m.address}</p>
      <p class="member-meta"><strong>Phone:</strong> <a href="tel:${m.phone}">${m.phoneDisplay ?? m.phone}</a></p>
      <p class="member-meta"><strong>Website:</strong> <a href="${m.website}" target="_blank" rel="noopener noreferrer">${m.website}</a></p>

      <span class="badge">${membershipLabel(m.membershipLevel)}</span>
    </article>
  `).join("");
}

async function loadMembers() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const data = await res.json();
    const members = data.members ?? [];

    renderMembers(members);
  } catch (err) {
    console.error(err);
    if (errorEl) errorEl.hidden = false;
  }
}

function setView(view) {
  const isList = view === "list";

  membersContainer.classList.toggle("list-view", isList);

  gridBtn.classList.toggle("active", !isList);
  listBtn.classList.toggle("active", isList);

  gridBtn.setAttribute("aria-pressed", String(!isList));
  listBtn.setAttribute("aria-pressed", String(isList));

  localStorage.setItem(STORAGE_KEY, view);
}

gridBtn?.addEventListener("click", () => setView("grid"));
listBtn?.addEventListener("click", () => setView("list"));

// Init
loadMembers();

const saved = localStorage.getItem(STORAGE_KEY);
setView(saved === "list" ? "list" : "grid");