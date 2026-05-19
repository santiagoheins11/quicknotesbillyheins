const input = document.getElementById('note-input');
const saveBtn = document.getElementById('save-btn');
const notesList = document.getElementById('notes-list');
const clearAll = document.getElementById('clear-all');
const exportBtn = document.getElementById('export-btn');
const count = document.getElementById('count');
const categorySelect = document.getElementById('category-select');
const categoryFilters = document.getElementById('category-filters');
const categoryStats = document.getElementById('category-stats');

const LAST_CATEGORY_KEY = 'lastCategory';

const CATEGORIES = {
  general: { label: 'General', color: '#7c6af7' },
  trabajo: { label: 'Trabajo', color: '#3b82f6' },
  estudio: { label: 'Estudio', color: '#10b981' },
  urgente: { label: 'Urgente', color: '#ef4444' },
};

let activeFilter = 'all';

function normalizeCategory(category) {
  return CATEGORIES[category] ? category : 'general';
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatTime(ts) {
  const d = new Date(ts);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
  return isToday ? `hoy ${time}` : d.toLocaleDateString('es') + ' ' + time;
}

function formatExportDateTime(ts) {
  return new Date(ts).toLocaleString('es', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getFilteredNotes(notes) {
  if (activeFilter === 'all') return notes;
  return notes.filter(n => normalizeCategory(n.category) === activeFilter);
}

function updateCategoryStats(notes) {
  const totals = {};
  notes.forEach(n => {
    const cat = normalizeCategory(n.category);
    totals[cat] = (totals[cat] || 0) + 1;
  });

  const parts = Object.keys(CATEGORIES)
    .filter(key => totals[key] > 0)
    .map(key => `${CATEGORIES[key].label} (${totals[key]})`);

  categoryStats.textContent = parts.length ? parts.join(' · ') : '';
}

function updateFilterButtons() {
  categoryFilters.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('filter-btn--active', btn.dataset.filter === activeFilter);
  });
}

function render(notes) {
  updateCategoryStats(notes);
  count.textContent = notes.length ? `(${notes.length})` : '';

  const filtered = getFilteredNotes(notes);

  if (!notes.length) {
    notesList.innerHTML = '<p class="empty">No hay notas aún 📝</p>';
    return;
  }

  if (!filtered.length) {
    notesList.innerHTML = '<p class="empty-filter">No hay notas en esta categoría</p>';
    return;
  }

  notesList.innerHTML = [...filtered].reverse().map(n => {
    const cat = normalizeCategory(n.category);
    const meta = CATEGORIES[cat];
    return `
    <div class="note-card">
      <div class="note-body">
        <span class="category-dot" style="background:${meta.color}" title="${meta.label}"></span>
        <div class="note-content">
          <div class="note-text">${escapeHtml(n.text)}</div>
          <div class="note-time">${formatTime(n.id)}</div>
        </div>
      </div>
      <button class="delete-btn" data-id="${n.id}">×</button>
    </div>
  `;
  }).join('');

  notesList.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      chrome.storage.local.get('notes', ({ notes }) => {
        const updated = notes.filter(n => n.id != btn.dataset.id);
        chrome.storage.local.set({ notes: updated }, () => render(updated));
      });
    });
  });
}

function saveLastCategory(category) {
  chrome.storage.local.set({ [LAST_CATEGORY_KEY]: category });
}

function loadLastCategory() {
  chrome.storage.local.get(LAST_CATEGORY_KEY, (result) => {
    const saved = result[LAST_CATEGORY_KEY];
    if (saved && CATEGORIES[saved]) {
      categorySelect.value = saved;
    }
  });
}

function exportNotes(notes) {
  if (!notes.length) {
    alert('No hay notas para exportar.');
    return;
  }

  const sorted = [...notes].sort((a, b) => b.id - a.id);
  const lines = [
    '=== Quick Notes Export ===',
    `Fecha: ${new Date().toLocaleString('es')}`,
    '',
  ];

  sorted.forEach(n => {
    const cat = CATEGORIES[normalizeCategory(n.category)].label.toUpperCase();
    lines.push(`${cat} — ${formatExportDateTime(n.id)}`);
    lines.push(n.text);
    lines.push('---');
    lines.push('');
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `quick-notes-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function save() {
  const text = input.value.trim();
  if (!text) return;

  const category = normalizeCategory(categorySelect.value);
  saveLastCategory(category);

  chrome.storage.local.get('notes', ({ notes = [] }) => {
    const updated = [...notes, { id: Date.now(), text, category }];
    chrome.storage.local.set({ notes: updated }, () => {
      input.value = '';
      render(updated);
    });
  });
}

saveBtn.addEventListener('click', save);
input.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'Enter') save();
});

categorySelect.addEventListener('change', () => {
  saveLastCategory(normalizeCategory(categorySelect.value));
});

categoryFilters.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  activeFilter = btn.dataset.filter;
  updateFilterButtons();
  chrome.storage.local.get('notes', ({ notes = [] }) => render(notes));
});

exportBtn.addEventListener('click', () => {
  chrome.storage.local.get('notes', ({ notes = [] }) => exportNotes(notes));
});

clearAll.addEventListener('click', () => {
  if (confirm('¿Borrar todas las notas?')) {
    chrome.storage.local.set({ notes: [] }, () => render([]));
  }
});

loadLastCategory();
updateFilterButtons();
chrome.storage.local.get('notes', ({ notes = [] }) => render(notes));
