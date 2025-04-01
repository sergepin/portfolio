export const routes = {
  en: {
    home: '',
    projects: 'projects',
    about: 'about',
    contact: 'contact'
  },
  es: {
    home: '',
    projects: 'projects',
    about: 'about',
    contact: 'contact'
  }
} as const;

export function getLocalizedPath(lang: string, path: keyof typeof routes.en) {
  return `/${lang}/${routes[lang as keyof typeof routes][path]}`;
}
