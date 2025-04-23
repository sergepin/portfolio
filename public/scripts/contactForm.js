export function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    if (!form || !formMessage || !submitText || !submitSpinner) {
        console.error('Required form elements not found');
        return;
    }
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
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
        // Cargar las variables del entorno con el prefijo NEXT_PUBLIC_ 
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const allowedOrigin = process.env.NEXT_PUBLIC_ALLOWED_ORIGIN;
        // Verificación de que las variables de entorno están definidas
        if (!apiBaseUrl || !apiKey || !allowedOrigin) {
            console.error('API base URL, API Key, or Allowed Origin is not defined in .env');
            return;
        }
        try {
            const response = await fetch(`${apiBaseUrl}/send-email`, {
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
            }
            else {
                throw new Error(result.message || 'Error sending message');
            }
        }
        catch (error) {
            formMessage.textContent = error instanceof Error ? error.message : 'Error sending message. Please try again.';
            formMessage.classList.remove('hidden', 'text-green-600');
            formMessage.classList.add('text-red-600');
        }
        finally {
            submitText.textContent = 'Send Message';
            submitSpinner.classList.add('hidden');
        }
    });
}
initializeContactForm();
