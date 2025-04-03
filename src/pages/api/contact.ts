import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
export const POST: APIRoute = async ({ request }) => {
    try {
      const text = await request.text(); // Read the raw request body
      console.log('Raw request body:', text); // Debugging
      const data = JSON.parse(text); // Parse JSON manually
  
      if (!data.name || !data.email || !data.subject || !data.message) {
        return new Response(
          JSON.stringify({ message: 'Missing required fields' }), 
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      console.log('Parsed request body:', data);
      const { name, email, subject, message } = data;
  
      if (!import.meta.env.EMAIL_USER || !import.meta.env.EMAIL_PASS) {
        console.error('Missing email configuration');
        return new Response(
          JSON.stringify({ message: 'Server configuration error' }), 
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: import.meta.env.EMAIL_USER,
          pass: import.meta.env.EMAIL_PASS
        }
      });
  
      const mailOptions = {
        from: import.meta.env.EMAIL_USER,
        to: 'sergepin96@gmail.com',
        subject: `[Portfolio Contact] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`
      };
  
      await transporter.sendMail(mailOptions);
      return new Response(
        JSON.stringify({ message: 'Email sent successfully' }), 
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
  
    } catch (error) {
      console.error('Error:', error);
      return new Response(
        JSON.stringify({ message: error instanceof Error ? error.message : 'Unknown error' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  };
  