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

function renderDetail(organ) {
  const pane = document.getElementById('detail-pane');

  const eatItems = organ.best_foods.map(f => `
    <li><span class="name">${f.food}</span><span class="why">${f.why}</span></li>
  `).join('');

  const limitItems = organ.foods_to_limit.map(f => `
    <li><span class="name">${f.food}</span><span class="why">${f.why}</span></li>
  `).join('');

  const tips = organ.daily_tips.map((t, i) => `
    <li><span class="num">${String(i + 1).padStart(2, '0')}</span><span>${t}</span></li>
  `).join('');

  const sources = organ.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('');

  pane.innerHTML = `
    <div class="detail">
      <span class="eyebrow">${organ.category}</span>
      <h1>${organ.name}</h1>
      <p class="lede">${organ.function}</p>

      <section>
        <h2>Foods that support it</h2>
        <ul class="food-grid eat">${eatItems}</ul>
      </section>

      <section>
        <h2>Foods to limit</h2>
        <ul class="food-grid limit">${limitItems}</ul>
      </section>

      <section>
        <h2>If you don't eat well</h2>
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
      </section>

      <section>
        <h2>Daily habits</h2>
        <ul class="tips">${tips}</ul>
      </section>

      <section>
        <h2>Sources</h2>
        <div class="sources">${sources}</div>
      </section>

      <div class="detail-disclaimer">
        Not medical advice. Consult a doctor for symptoms or health conditions.
      </div>
    </div>
  `;
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
    renderDetail(organMap[id]);
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
}

init();
