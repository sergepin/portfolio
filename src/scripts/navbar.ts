function updateTheme(isDark: boolean) {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const mobileSunIcon = document.getElementById('mobile-sun-icon');
    const mobileMoonIcon = document.getElementById('mobile-moon-icon');
    const mobileThemeText = document.getElementById('mobile-theme-text');
  
    if (sunIcon) sunIcon.classList.toggle('hidden', isDark);
    if (moonIcon) moonIcon.classList.toggle('hidden', !isDark);
    if (mobileSunIcon) mobileSunIcon.classList.toggle('hidden', isDark);
    if (mobileMoonIcon) mobileMoonIcon.classList.toggle('hidden', !isDark);
    if (mobileThemeText) {
      mobileThemeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    updateTheme(isDark);
  
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    [themeToggle, mobileThemeToggle].forEach(button => {
      button?.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        updateTheme(!isDark);
      });
    });
  
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  
    document.querySelectorAll('[data-lang]').forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const targetLang = target.getAttribute('data-lang');
        if (!targetLang) return;
  
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace(/^\/[^\/]+/, `/${targetLang}`);
  
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-background-primary z-50 flex items-center justify-center animate-fade-in';
        overlay.innerHTML = `
          <div class="text-center">
            <span class="text-4xl font-bold text-primary block mb-2">${targetLang.toUpperCase()}</span>
            <span class="text-secondary text-sm">${targetLang === 'en' ? 'Loading...' : 'Cargando...'}</span>
          </div>
        `;
        document.body.appendChild(overlay);
  
        const contentWrapper = document.querySelector('.content-wrapper') as HTMLElement;
        if (contentWrapper) {
          contentWrapper.style.animation = 'fadeOut 0.3s ease-in-out forwards';
        }
  
        setTimeout(() => {
          window.location.href = newPath;
        }, 300);
      });
    });
  });
  