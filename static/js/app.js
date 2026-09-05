async function fetchOrgans() {
  const res = await fetch('/api/organs');
  return res.json();
}

function renderList(organs, activeId) {
  const list = document.querySelector('.organ-list');
  list.innerHTML = organs.map(o => `
    <button class="organ-item ${o.id === activeId ? 'active' : ''}" data-organ="${o.id}">
      <span>${o.name}</span>
      <span class="category">${o.category.split(' ')[0]}</span>
    </button>
  `).join('');
}

const TABS = [
  { id: 'eat', label: 'Foods that support it' },
  { id: 'limit', label: 'Foods to limit' },
  { id: 'neglect', label: "If you don't eat well" },
  { id: 'tips', label: 'Daily habits' },
];

function tabPanelHTML(tabId, organ) {
  if (tabId === 'eat') {
    const items = organ.best_foods.map(f => `
      <li><span class="name">${f.food}</span><span class="why">${f.why}</span></li>
    `).join('');
    return `<ul class="food-grid eat">${items}</ul>`;
  }
  if (tabId === 'limit') {
    const items = organ.foods_to_limit.map(f => `
      <li><span class="name">${f.food}</span><span class="why">${f.why}</span></li>
    `).join('');
    return `<ul class="food-grid limit">${items}</ul>`;
  }
  if (tabId === 'neglect') {
    return `
      <div class="effects">
        <div class="effect-block">
          <span class="term">Short term</span>
          <p>${organ.neglect_effects.short_term}</p>
        </div>
        <div class="effect-block">
          <span class="term">Long term</span>
          <p>${organ.neglect_effects.long_term}</p>
        </div>
      </div>
    `;
  }
  if (tabId === 'tips') {
    const items = organ.daily_tips.map((t, i) => `
      <li><span class="num">${String(i + 1).padStart(2, '0')}</span><span>${t}</span></li>
    `).join('');
    return `<ul class="tips">${items}</ul>`;
  }
  return '';
}

function renderDetail(organ, activeTab) {
  const pane = document.getElementById('detail-pane');
  const currentTab = activeTab || 'eat';

  const sources = organ.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('');

  const tabButtons = TABS.map(t => `
    <button class="tab-btn ${t.id === currentTab ? 'active' : ''}" data-tab="${t.id}">${t.label}</button>
  `).join('');

  pane.innerHTML = `
    <div class="detail">
      <span class="eyebrow">${organ.category}</span>
      <h1>${organ.name}</h1>

      <p class="lede">${organ.function}</p>

      <div class="tab-bar" role="tablist">${tabButtons}</div>
      <div class="tab-panel" id="tab-panel">${tabPanelHTML(currentTab, organ)}</div>

      <section class="sources-section">
        <h2>Sources</h2>
        <div class="sources">${sources}</div>
      </section>

      <div class="detail-disclaimer">
        Not medical advice. Consult a doctor for symptoms or health conditions.
      </div>
    </div>
  `;

  pane.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      pane.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('tab-panel');
      panel.classList.remove('rise');
      panel.innerHTML = tabPanelHTML(btn.dataset.tab, organ);
      void panel.offsetWidth;
      panel.classList.add('rise');
    });
  });
}

function renderPinnedFigure(organ) {
  const holder = document.getElementById('organ-figure-pinned');
  if (!holder) return;
  if (!organ.image) {
    holder.innerHTML = '';
    holder.classList.remove('visible');
    return;
  }
  holder.innerHTML = `
    <img src="${organ.image}" alt="${organ.name} illustration">
    <div class="organ-figure-pinned-caption">
      <span class="name">${organ.name}</span>
      <span class="credit">${organ.image_credit || ''}</span>
    </div>
  `;
  holder.classList.add('visible');
}

function setActiveVisuals(id) {
  document.querySelectorAll('.organ-marker').forEach(m => {
    m.classList.toggle('active', m.dataset.organ === id);
  });
  document.querySelectorAll('.chip').forEach(c => {
    c.classList.toggle('active', c.dataset.organ === id);
  });
  document.querySelectorAll('.organ-item').forEach(item => {
    item.classList.toggle('active', item.dataset.organ === id);
  });
}

async function init() {
  const organs = await fetchOrgans();
  const organMap = {};
  organs.forEach(o => organMap[o.id] = o);

  function select(id) {
    if (!organMap[id]) return;
    setActiveVisuals(id);
    renderDetail(organMap[id], 'eat');
    renderPinnedFigure(organMap[id]);
    renderList(organs, id);
    attachListListeners();
  }

  function attachListListeners() {
    document.querySelectorAll('.organ-item').forEach(item => {
      item.addEventListener('click', () => select(item.dataset.organ));
    });
  }

  renderList(organs, null);
  attachListListeners();

  document.querySelectorAll('.organ-marker, .chip').forEach(el => {
    el.addEventListener('click', () => select(el.dataset.organ));
  });

  // default selection
  select('heart');

  // Sidebar collapse/expand
  const appEl = document.getElementById('app');
  const toggleBtn = document.getElementById('rail-toggle');
  const collapsed = localStorage.getItem('bw-rail-collapsed') === 'true';
  if (collapsed) {
    appEl.classList.add('collapsed');
    toggleBtn.setAttribute('aria-label', 'Show sidebar');
    toggleBtn.title = 'Show sidebar';
  }
  toggleBtn.addEventListener('click', () => {
    const isCollapsed = appEl.classList.toggle('collapsed');
    localStorage.setItem('bw-rail-collapsed', isCollapsed);
    toggleBtn.setAttribute('aria-label', isCollapsed ? 'Show sidebar' : 'Hide sidebar');
    toggleBtn.title = isCollapsed ? 'Show sidebar' : 'Hide sidebar';
  });
}

init();
