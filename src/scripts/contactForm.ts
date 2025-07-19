export function initializeContactForm() {
  const form = document.getElementById('contactForm') as HTMLFormElement;
  const formMessage = document.getElementById('formMessage') as HTMLDivElement;
  const submitText = document.getElementById('submitText') as HTMLSpanElement;
  const submitSpinner = document.getElementById('submitSpinner') as HTMLDivElement;

  if (!form || !formMessage || !submitText || !submitSpinner) {
    console.error('Required form elements not found');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener el token de Turnstile
    const turnstileResponse = await window.turnstile.getResponse();
    if (!turnstileResponse) {
      formMessage.textContent = 'Please complete the Turnstile verification';
      formMessage.classList.remove('hidden', 'text-green-600');
      formMessage.classList.add('text-red-600');
      return;
    }

    submitText.textContent = 'Sending...';
    submitSpinner.classList.remove('hidden');
    formMessage.classList.add('hidden');

    const formData = new FormData(form);
    const data = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      subject: formData.get('subject')?.toString() || '',
      message: formData.get('message')?.toString() || '',
      'cf-turnstile-response': turnstileResponse
    };

    // Cargar las variables del entorno con el prefijo NEXT_PUBLIC_ 
    const apiBaseUrl = "https://secure-email-api.vercel.app";
    const apiKey = "SG.1234567890";
    const allowedOrigin = "https://sergiopinzon.dev";

    // Verificación de que las variables de entorno están definidas
    if (!apiBaseUrl || !apiKey || !allowedOrigin) {
      console.error('API base URL, API Key, or Allowed Origin is not defined in .env');
      return;
    }

    try {
      const response = await fetch(`/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'Origin': allowedOrigin
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        formMessage.textContent = 'Message sent successfully!';
        formMessage.classList.remove('hidden', 'text-red-600');
        formMessage.classList.add('text-green-600');
        form.reset();
        // Reset Turnstile
        window.turnstile.reset();
        
        // Track successful form submission
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'form_submit',
            form_name: 'contact_form',
            form_status: 'success',
            page_location: window.location.href
          });
        }
      } else {
        throw new Error(result.message || 'Error sending message');
      }
    } catch (error) {
      formMessage.textContent = error instanceof Error ? error.message : 'Error sending message. Please try again.';
      formMessage.classList.remove('hidden', 'text-green-600');
      formMessage.classList.add('text-red-600');
      // Reset Turnstile en caso de error
      window.turnstile.reset();
      
      // Track failed form submission
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submit',
          form_name: 'contact_form',
          form_status: 'error',
          error_message: error instanceof Error ? error.message : 'Unknown error',
          page_location: window.location.href
        });
      }
    } finally {
      submitText.textContent = 'Send Message';
      submitSpinner.classList.add('hidden');
    }
  });
}

// Agregar la declaración de tipos para Turnstile y Google Tag Manager
declare global {
  interface Window {
    turnstile: {
      getResponse: () => Promise<string>;
      reset: () => void;
    };
    dataLayer: any[];
  }
}

initializeContactForm();
