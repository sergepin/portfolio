// Configuración de Analytics
export const analyticsConfig = {
  // Google Tag Manager
  googleTagManager: {
    containerId: import.meta.env.PUBLIC_GTM_ID || 'GTM-W2KMLT7L',
    enabled: import.meta.env.PUBLIC_GTM_ENABLED !== 'false',
  },
};

// Eventos personalizados para tracking
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Tipos para TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
} 