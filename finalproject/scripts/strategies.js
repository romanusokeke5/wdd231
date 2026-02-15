/* scripts/strategies.js */
import { openModal } from './modal.js';
import { saveProgress, loadProgress } from './storage.js';

const listEl = document.getElementById('strategyList');
const spotlightEl = document.getElementById('spotlights');
const searchInput = document.getElementById('searchInput');
const riskFilter = document.getElementById('riskFilter');
const clearBtn = document.getElementById('clearFilters');

// Fetch Data (Async/Await)
async function getStrategies() {
  try {
    const response = await fetch('data/strategies.json');
    if (!response.ok) throw new Error('Data fetch failed');
    const data = await response.json();
    return data.strategies; // Returns array of 15 items
  } catch (error) {
    console.error(error);
    if(listEl) listEl.innerHTML = '<p>Error loading data.</p>';
  }
}

// Template Literal & DOM Injection
function renderCards(strategies, container) {
  if (!container) return;
  container.innerHTML = '';
  
  if (strategies.length === 0) {
    container.innerHTML = '<p class="muted">No strategies found.</p>';
    return;
  }

  // Array Method: Map
  const html = strategies.map(s => {
    // Check LocalStorage for bookmark
    const bookmarks = loadProgress(); 
    const isSaved = bookmarks.includes(s.id);
    const btnText = isSaved ? 'Saved \u2713' : 'Bookmark';
    const btnStyle = isSaved ? 'color:var(--primary)' : '';

    return `
      <article class="strategy-card">
        <div class="strategy-meta">
          <span class="tag risk-${s.risk}">${s.risk} Risk</span>
          <span class="tag">${s.type}</span>
        </div>
        <h3>${s.title}</h3>
        <p class="muted">${s.description}</p>
        <div style="margin-top:auto; display:flex; gap:10px; padding-top:1rem;">
          <button class="open-modal cta-btn ghost" style="flex:1; font-size:0.8rem;" data-id="${s.id}">View Rules</button>
          <button class="save-btn" style="background:none; border:none; cursor:pointer; color:var(--text-muted); ${btnStyle}" data-id="${s.id}">${btnText}</button>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = html;

  // Add Event Listeners (DOM Manipulation)
  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      // Array Method: Find
      const item = strategies.find(s => s.id === id);
      if(item) {
        openModal('strategyModal', `
          <h2>${item.title}</h2>
          <p class="muted">${item.description}</p>
          <hr style="border:0; border-top:1px solid #444; margin:1rem 0;">
          <h4>Execution Example:</h4>
          <code style="display:block; background:#000; padding:1rem; border-radius:4px; color:var(--primary);">${item.example}</code>
        `);
      }
    });
  });

  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      saveProgress(id); // Save to LocalStorage
      e.target.textContent = 'Saved \u2713';
      e.target.style.color = 'var(--primary)';
    });
  });
}

// Initialization
async function init() {
  const allStrategies = await getStrategies();

  // Strategies Page
  if (listEl) {
    renderCards(allStrategies, listEl);

    // Filters
    const filterHandler = () => {
      const query = searchInput.value.toLowerCase();
      const risk = riskFilter.value;

      // Array Method: Filter
      const filtered = allStrategies.filter(s => {
        const matchesSearch = s.title.toLowerCase().includes(query);
        const matchesRisk = risk === '' || s.risk === risk;
        return matchesSearch && matchesRisk;
      });
      renderCards(filtered, listEl);
    };

    searchInput.addEventListener('input', filterHandler);
    riskFilter.addEventListener('change', filterHandler);
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      riskFilter.value = '';
      renderCards(allStrategies, listEl);
    });
  }

  // Home Page Spotlight (Random 3)
  if (spotlightEl) {
    const shuffled = allStrategies.sort(() => 0.5 - Math.random()); // Random sort
    renderCards(shuffled.slice(0, 3), spotlightEl);
  }
}

init();