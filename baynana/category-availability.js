(() => {
  'use strict';
  let state = {};
  let account = '';
  let requestId = 0;

  function paint() {
    document.querySelectorAll('#setupCategories .setup-category').forEach(card => {
      let badge = card.querySelector('.category-remaining');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'category-remaining';
        card.append(badge);
      }
      const name = card.querySelector('strong').textContent;
      const count = state[name] || 0;
      badge.textContent = new Intl.NumberFormat('ar-SA').format(count);
      badge.setAttribute('aria-label', count + ' ألعاب متبقية');
      badge.title = count + ' ألعاب متبقية';
    });
  }

  async function refresh() {
    const phone = localStorage.getItem('playerPhone') || '';
    account = phone;
    state = {};
    paint();
    const currentRequest = ++requestId;
    if (!phone) return;
    try {
      const response = await fetch('/api/game-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'baynana-progress', phone })
      });
      const result = await response.json();
      if (currentRequest !== requestId || phone !== localStorage.getItem('playerPhone')) return;
      if (response.ok && result.ok) state = result.remaining;
      paint();
    } catch {
      // A failed request never invents available games.
    }
  }

  window.BaynanaAvailability = {
    refresh,
    async consume(questionId) {
      const phone = localStorage.getItem('playerPhone');
      if (!phone || !questionId) return;
      const response = await fetch('/api/game-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'baynana-progress', phone, questionId })
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error('progress_unavailable');
      if (phone === localStorage.getItem('playerPhone')) {
        state = result.remaining;
        paint();
      }
    }
  };
  const grid = document.getElementById('setupCategories');
  new MutationObserver(paint).observe(grid, { childList: true });
  new MutationObserver(() => {
    if (!document.getElementById('categorySetup').hidden) refresh();
  }).observe(document.getElementById('categorySetup'), { attributes: true, attributeFilter: ['hidden'] });
  window.addEventListener('storage', event => {
    if (event.key === 'playerPhone') refresh();
  });
  window.addEventListener('focus', () => {
    if (account !== (localStorage.getItem('playerPhone') || '')) refresh();
  });
  refresh();
})();
