document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const mobileSunIcon = document.getElementById('mobile-sun-icon');
    const mobileMoonIcon = document.getElementById('mobile-moon-icon');
    const mobileThemeText = document.getElementById('mobile-theme-text');

    function updateTheme(isDark: boolean) {
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.classList.toggle('light', !isDark);
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        if (sunIcon) sunIcon.classList.toggle('hidden', isDark);
        if (moonIcon) moonIcon.classList.toggle('hidden', !isDark);
        
        if (mobileSunIcon) mobileSunIcon.classList.toggle('hidden', isDark);
        if (mobileMoonIcon) mobileMoonIcon.classList.toggle('hidden', !isDark);
        if (mobileThemeText) {
            mobileThemeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }
        
        if (!isDark) {
            document.documentElement.style.setProperty('--bg-primary', '#ffffff');
            document.documentElement.style.setProperty('--bg-secondary', '#f8fafc');
        } else {
            document.documentElement.style.setProperty('--bg-primary', '#0f172a');
            document.documentElement.style.setProperty('--bg-secondary', '#1e293b');
        }
    }

    if (sunIcon && moonIcon) {
        const isDark = document.documentElement.classList.contains('dark');
        sunIcon.classList.toggle('hidden', isDark);
        moonIcon.classList.toggle('hidden', !isDark);

        if (mobileSunIcon) mobileSunIcon.classList.toggle('hidden', isDark);
        if (mobileMoonIcon) mobileMoonIcon.classList.toggle('hidden', !isDark);
        if (mobileThemeText) {
            mobileThemeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.classList.contains('dark');
            updateTheme(!isDark);
        });
    }

    document.querySelectorAll('button[data-lang]').forEach(button => {
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

    const contentWrapper = document.querySelector('.content-wrapper') as HTMLElement;
    if (contentWrapper) {
        contentWrapper.style.animation = 'fadeIn 0.3s ease-in-out forwards';
    }

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            updateTheme(!isDark);
        });
    }
});
