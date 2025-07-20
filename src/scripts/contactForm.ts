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

    const lambdaUrl = 'https://p6hz5dey5elprttd47tdfax6mq0rymxy.lambda-url.us-east-2.on.aws/';

    try {
      const response = await fetch(lambdaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // NO necesitas 'origin' ni 'x-api-key' a menos que tú los exijas desde la Lambda
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        formMessage.textContent = 'Message sent successfully!';
        formMessage.classList.remove('hidden', 'text-red-600');
        formMessage.classList.add('text-green-600');
        form.reset();
        window.turnstile.reset();

        // Google Tag Manager event
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'form_submit',
            form_name: 'contact_form',
            form_status: 'success',
            page_location: window.location.href
          });
        }
      } else {
        const errorMessage = result.message || 'Error sending message. Please try again.';
        formMessage.textContent = errorMessage;
        formMessage.classList.remove('hidden', 'text-green-600');
        formMessage.classList.add('text-red-600');
      }
    } catch (error) {
      formMessage.textContent = error instanceof Error ? error.message : 'Error sending message. Please try again.';
      formMessage.classList.remove('hidden', 'text-green-600');
      formMessage.classList.add('text-red-600');
      window.turnstile.reset();

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

// Declaración global
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
