// Script de verificación de Google Tag Manager
export function verifyAnalytics() {
  // Verificar si Google Tag Manager está cargado
  if (typeof window.dataLayer === 'undefined') {
    console.warn('⚠️ Google Tag Manager no está cargado');
    return false;
  }

  // Verificar si dataLayer existe y tiene contenido
  if (!window.dataLayer || window.dataLayer.length === 0) {
    console.warn('⚠️ DataLayer no está inicializado o está vacío');
    return false;
  }

  console.log('✅ Google Tag Manager está funcionando correctamente');
  console.log('📊 DataLayer:', window.dataLayer);
  
  return true;
}

// Función para enviar evento de prueba
export function sendTestEvent() {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'test_event',
      event_category: 'analytics_test',
      event_label: 'verification',
      value: 1
    });
    console.log('✅ Evento de prueba enviado a GTM');
  } else {
    console.warn('⚠️ No se puede enviar evento de prueba - dataLayer no disponible');
  }
}

// Verificar analytics al cargar la página
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      verifyAnalytics();
    }, 2000); // Esperar 2 segundos para que GA se cargue
  });
} 