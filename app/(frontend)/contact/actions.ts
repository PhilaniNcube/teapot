'use server'

import { resend } from '@/lib/resend'

export async function sendContactEmail(prevState: any, formData: FormData) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_SENDER_EMAIL_ADDRESS!,
      to: 'wynnetownsend@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    if (error) {
      console.error('Error sending email:', error)
      return { success: false, message: 'Failed to send message.' }
    }

    return { success: true, message: 'Message sent successfully!' }
  } catch (error) {
    console.error('Unexpected error sending email:', error)
    return { success: false, message: 'An unexpected error occurred.' }
  }
}
