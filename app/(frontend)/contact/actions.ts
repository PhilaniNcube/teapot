'use server'

import { createElement } from 'react'

import ContactFormSubmissionEmail from '@/emails/contact-form-submission'
import { resend } from '@/lib/resend'

export type ContactEmailState = {
  success?: boolean
  message?: string
}

export async function sendContactEmail(
  _prevState: ContactEmailState,
  formData: FormData
) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  // const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  const senderEmail = process.env.RESEND_SENDER_EMAIL_ADDRESS
  const notificationEmail = process.env.NEXT_PUBLIC_EMAIL_ADDRESS

  if (!senderEmail || !notificationEmail) {
    console.error(
      'Missing RESEND_SENDER_EMAIL_ADDRESS or NEXT_PUBLIC_EMAIL_ADDRESS. Contact email was not sent.'
    )
    return { success: false, message: 'Failed to send message.' }
  }

  try {
    const { error } = await resend.emails.send({
      from: senderEmail,
      to: notificationEmail,
      replyTo: email,
      subject: `Book Order Inquiry from ${firstName} ${lastName}`,
      react: createElement(ContactFormSubmissionEmail, {
        submission: {
          firstName,
          lastName,
          email,
          // subject,
          message,
        },
      }),
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
