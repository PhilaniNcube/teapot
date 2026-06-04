'use server'

import { createElement } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { resend } from '@/lib/resend'
import WelcomeNewsletterEmail from '@/emails/welcome-newsletter'

export type NewsletterState = {
  success?: boolean
  message?: string
}

export async function subscribeNewsletter(
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = (formData.get('email') as string)?.trim()

  if (!email) {
    return { success: false, message: 'Email address is required.' }
  }

  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  try {
    const payload = await getPayload({ config })

    // Check if email already exists
    const existing = await payload.find({
      collection: 'subscribers' as any,
      where: {
        email: {
          equals: email,
        },
      },
      overrideAccess: true,
    })

    if (existing.docs.length > 0) {
      return {
        success: false,
        message: 'You are already subscribed to the newsletter!',
      }
    }

    // Save subscriber to database
    await payload.create({
      collection: 'subscribers' as any,
      data: {
        email,
      },
      overrideAccess: true,
    })

    const senderEmail = process.env.RESEND_SENDER_EMAIL_ADDRESS
    const adminNotificationEmail = process.env.NEXT_PUBLIC_EMAIL_ADDRESS

    if (!senderEmail) {
      console.warn('Missing RESEND_SENDER_EMAIL_ADDRESS. Welcome emails cannot be sent.')
      // Even if Resend fails/is unconfigured, we saved the subscriber locally so return success.
      return { success: true, message: 'Successfully subscribed to the newsletter!' }
    }

    // Send Welcome Email to Subscriber
    try {
      const { error: welcomeError } = await resend.emails.send({
        from: senderEmail,
        to: email,
        subject: "Welcome to Barbara's Readers' Circle",
        react: createElement(WelcomeNewsletterEmail, { email }),
      })

      if (welcomeError) {
        console.error('Error sending welcome email:', welcomeError)
      }
    } catch (emailErr) {
      console.error('Unexpected error sending welcome email:', emailErr)
    }

    // Send Notification Email to Admin
    if (adminNotificationEmail) {
      try {
        await resend.emails.send({
          from: senderEmail,
          to: adminNotificationEmail,
          subject: "New Readers' Circle Subscriber",
          html: `<p>You have a new subscriber to Barbara's Readers' Circle!</p>
                 <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>`,
        })
      } catch (adminEmailErr) {
        console.error('Unexpected error sending admin notification email:', adminEmailErr)
      }
    }

    return { success: true, message: 'Successfully subscribed to the newsletter!' }
  } catch (error) {
    console.error('Unexpected error in newsletter subscription:', error)
    return { success: false, message: 'An unexpected error occurred. Please try again.' }
  }
}
