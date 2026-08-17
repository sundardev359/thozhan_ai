//Thozhan AI - Theme Manager
//   ============================================ */

const ThemeManager = {
  STORAGE_KEY: 'thozhan-theme',

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    this.apply(theme);
    this.setupToggle();
    this.setupSystemPreference();
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.updateToggleUI(theme);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
    return next;
  },

  get() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  },

  updateToggleUI(theme) {
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(toggle => {
      const input = toggle.querySelector('input');
      if (input) input.checked = theme === 'dark';
      const icon = toggle.querySelector('.theme-icon');
      if (icon) icon.textContent = theme === 'dark' ? '\u263E' : '\u2600';
    });
  },

  setupToggle() {
    document.querySelectorAll('.theme-toggle input').forEach(input => {
      input.addEventListener('change', () => this.toggle());
    });
  },

  setupSystemPreference() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.apply(e.matches ? 'dark' : 'light');
      }
    });
  }
};
