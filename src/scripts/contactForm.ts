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
    
    // Show loading state
    submitText.textContent = 'Sending...';
    submitSpinner.classList.remove('hidden');
    formMessage.classList.add('hidden');

    const formData = new FormData(form);
    const data = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      subject: formData.get('subject')?.toString() || '',
      message: formData.get('message')?.toString() || ''
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        formMessage.textContent = 'Message sent successfully!';
        formMessage.classList.remove('hidden', 'text-red-600');
        formMessage.classList.add('text-green-600');
        form.reset();
      } else {
        throw new Error(result.message || 'Error sending message');
      }
    } catch (error) {
      formMessage.textContent = error instanceof Error ? error.message : 'Error sending message. Please try again.';
      formMessage.classList.remove('hidden', 'text-green-600');
      formMessage.classList.add('text-red-600');
    } finally {
      // Reset button state
      submitText.textContent = 'Send Message';
      submitSpinner.classList.add('hidden');
    }
  });
} 