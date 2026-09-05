async function fetchOrgans() {
  const res = await fetch('/api/organs');
  return res.json();
}

function renderCard(organ) {
  const panel = document.getElementById('card-panel');
  const foodItems = organ.best_foods.map(f => `
    <li><strong>${f.food}</strong>${f.why}</li>
  `).join('');

  const limitItems = organ.foods_to_limit.map(f => `
    <li><strong>${f.food}</strong>${f.why}</li>
  `).join('');

  const tips = organ.daily_tips.map(t => `<li>${t}</li>`).join('');

  const sources = organ.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join('');

  panel.innerHTML = `
    <div class="card">
      <span class="category">${organ.category}</span>
      <h2>${organ.name}</h2>
      <section>
        <h3>🧬 What it does</h3>
        <p>${organ.function}</p>
      </section>
      <section>
        <h3>✅ Best foods</h3>
        <ul class="food-list">${foodItems}</ul>
      </section>
      <section>
        <h3>⚠️ Foods to limit</h3>
        <ul class="food-list limit">${limitItems}</ul>
      </section>
      <section>
        <h3>🚨 If you don't eat right</h3>
        <div class="neglect-box">
          <div class="neglect-item">
            <span class="label">Short term</span>
            <p>${organ.neglect_effects.short_term}</p>
          </div>
          <div class="neglect-item">
            <span class="label">Long term</span>
            <p>${organ.neglect_effects.long_term}</p>
          </div>
        </div>
      </section>
      <section>
        <h3>💡 Daily tips</h3>
        <ul class="tips-list">${tips}</ul>
      </section>
      <section>
        <h3>📚 Sources</h3>
        <div class="sources">${sources}</div>
      </section>
      <div class="card-disclaimer">
        Not medical advice. Consult a doctor for symptoms or health conditions.
      </div>
    </div>
  `;
}

async function init() {
  const organs = await fetchOrgans();
  const organMap = {};
  organs.forEach(o => organMap[o.id] = o);

  const hotspots = document.querySelectorAll('.organ-hotspot');
  hotspots.forEach(spot => {
    const id = spot.dataset.organ;
    if (!organMap[id]) {
      spot.style.display = 'none';
      return;
    }
    spot.addEventListener('click', () => {
      hotspots.forEach(s => s.classList.remove('active'));
      spot.classList.add('active');
      renderCard(organMap[id]);
    });
  });

  // Auto-select heart on load as example
  const heartSpot = document.querySelector('[data-organ="heart"]');
  if (heartSpot) heartSpot.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

init();
