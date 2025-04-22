"use strict";
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('button[data-lang]').forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.currentTarget;
            const targetLang = target.getAttribute('data-lang');
            if (!targetLang)
                return;
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
            const contentWrapper = document.querySelector('.content-wrapper');
            if (contentWrapper) {
                contentWrapper.style.animation = 'fadeOut 0.3s ease-in-out forwards';
            }
            setTimeout(() => {
                window.location.href = newPath;
            }, 300);
        });
    });
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.style.animation = 'fadeIn 0.3s ease-in-out forwards';
    }
});
