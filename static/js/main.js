//Thozhan AI - Main JavaScript
//   Common utilities and page logic
//   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  initNavbar();
  initAuthForms();
  initToasts();
});

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Auth Forms ---------- */
function initAuthForms() {
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.textContent = isPassword ? '\u{1F441}' : '\u{1F441}\u{FE0F}';
    });
  });

//  const loginForm = document.getElementById('loginForm');
//  if (loginForm) {
//    loginForm.addEventListener('submit', handleLogin);
//  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }
}

function handleLogin(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('[name="email"]');
  const password = form.querySelector('[name="password"]');
  let valid = true;

  if (!email.value || !isValidEmail(email.value)) {
    showError(email, 'Please enter a valid email');
    valid = false;
  } else {
    clearError(email);
  }

  if (!password.value || password.value.length < 6) {
    showError(password, 'Password must be at least 6 characters');
    valid = false;
  } else {
    clearError(password);
  }

  if (valid) {
    const btn = form.querySelector('.btn-primary');
    btn.innerHTML = '<span class="spinner spinner-sm"></span> Logging in...';
    btn.disabled = true;
    setTimeout(() => {
      window.location.href = '/chat/';
    }, 1200);
  }
}

function handleSignup(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('[name="name"]');
  const email = form.querySelector('[name="email"]');
  const password = form.querySelector('[name="password"]');
  const confirmPassword = form.querySelector('[name="confirmPassword"]');
  let valid = true;

  if (!name.value || name.value.trim().length < 2) {
    showError(name, 'Please enter your name');
    valid = false;
  } else {
    clearError(name);
  }

  if (!email.value || !isValidEmail(email.value)) {
    showError(email, 'Please enter a valid email');
    valid = false;
  } else {
    clearError(email);
  }

  if (!password.value || password.value.length < 6) {
    showError(password, 'Password must be at least 6 characters');
    valid = false;
  } else {
    clearError(password);
  }

  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, 'Passwords do not match');
    valid = false;
  } else {
    clearError(confirmPassword);
  }

  if (valid) {
    const btn = form.querySelector('.btn-primary');
    btn.innerHTML = '<span class="spinner spinner-sm"></span> Creating account...';
    btn.disabled = true;
    setTimeout(() => {
      showToast('Account created successfully!', 'success');
      setTimeout(() => {
        window.location.href = '/login/';
      }, 800);
    }, 1200);
  }
}

function showError(input, message) {
  const group = input.closest('.form-group');
  if (group) {
    group.classList.add('error');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) errorEl.textContent = message;
  }
}

function clearError(input) {
  const group = input.closest('.form-group');
  if (group) {
    group.classList.remove('error');
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---------- Toast Notifications ---------- */
function initToasts() {
  if (!document.querySelector('.toast-container')) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

function showToast(message, type = 'success', duration = 4000) {
  const container = document.querySelector('.toast-container');
  if (!container) return;

  const icons = {
    success: '\u2713',
    error: '\u2717',
    warning: '\u26A0'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.success}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">\u2715</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
