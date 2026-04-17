import { createElement } from 'react'
import { CollectionAfterChangeHook } from 'payload'
import OrderConfirmationEmail from '@/emails/order-confirmation'
import OrderNotificationEmail from '@/emails/order-notification'
import type { OrderEmailData } from '@/emails/order-email-layout'
import { resend } from '@/lib/resend'
import { Order } from '@/payload-types'

type SendOrderEmailArgs = Parameters<CollectionAfterChangeHook<Order>>[0]

const shippingMethodLabels: Record<Order['shippingMethod'], string> = {
  pep_standard: 'PEP Store (7-9 days) - R60',
  pep_express: 'PEP Store (3-5 days) - R120',
}

async function buildOrderEmailData(
  order: Order,
  req: SendOrderEmailArgs['req']
): Promise<OrderEmailData> {
  const items = await Promise.all(
    (order.items ?? []).map(async (item) => {
      const bookId = typeof item.book === 'object' ? item.book.id : item.book

      if (typeof item.book === 'object') {
        return {
          title: item.book.title,
          quantity: item.quantity,
          unitPrice: item.price,
          lineTotal: item.price * item.quantity,
        }
      }

      try {
        const book = await req.payload.findByID({
          collection: 'books',
          id: bookId,
        })

        return {
          title: book.title,
          quantity: item.quantity,
          unitPrice: item.price,
          lineTotal: item.price * item.quantity,
        }
      } catch {
        return {
          title: `Book #${bookId}`,
          quantity: item.quantity,
          unitPrice: item.price,
          lineTotal: item.price * item.quantity,
        }
      }
    })
  )

  const addressLines: string[] = []
  if (order.customerDetails.address) {
    addressLines.push(order.customerDetails.address)
  }
  if (order.customerDetails.city || order.customerDetails.province) {
    addressLines.push(
      [order.customerDetails.city, order.customerDetails.province].filter(Boolean).join(', ')
    )
  }
  if (order.customerDetails.postalCode) {
    addressLines.push(order.customerDetails.postalCode)
  }

  return {
    orderId: order.id,
    customerName: `${order.customerDetails.firstName} ${order.customerDetails.lastName}`,
    customerEmail: order.customerDetails.email,
    customerPhone: order.customerDetails.phone,
    shippingMethodLabel: shippingMethodLabels[order.shippingMethod],
    collectionPoint: order.collectionPoint,
    shippingCost: order.shippingCost,
    total: order.total,
    addressLines: addressLines.length > 0 ? addressLines : undefined,
    items,
  }
}

async function sendOrderEmailMessage(
  label: string,
  data: Parameters<typeof resend.emails.send>[0]
) {
  try {
    const { error } = await resend.emails.send(data)

    if (error) {
      console.error(`Failed to send ${label}:`, error)
    }
  } catch (error) {
    console.error(`Unexpected error sending ${label}:`, error)
  }
}

export const sendOrderEmail: CollectionAfterChangeHook<Order> = async ({
  doc,
  req,
  operation,
}) => {
  if (operation !== 'create') {
    return doc
  }

  const senderEmail = process.env.RESEND_SENDER_EMAIL_ADDRESS
  const notificationEmail = "cathteapot@gmail.com"

  if (!senderEmail || !notificationEmail) {
    console.error(
      'Missing RESEND_SENDER_EMAIL_ADDRESS or NEXT_PUBLIC_EMAIL_ADDRESS. Order emails were not sent.'
    )
    return doc
  }

  try {
    const orderEmailData = await buildOrderEmailData(doc, req)

    await Promise.all([
      sendOrderEmailMessage('customer order confirmation', {
        from: senderEmail,
        to: doc.customerDetails.email,
        replyTo: notificationEmail,
        subject: `Teapot Publishing order confirmation`,
        react: createElement(OrderConfirmationEmail, {
          order: orderEmailData,
          supportEmail: notificationEmail,
        }),
      }),
      sendOrderEmailMessage('internal order notification', {
        from: senderEmail,
        to: notificationEmail,
        replyTo: doc.customerDetails.email,
        subject: `New order received #${doc.id}`,
        react: createElement(OrderNotificationEmail, {
          order: orderEmailData,
        }),
      }),
    ])
  } catch (error) {
    console.error('Error preparing order emails:', error)
  }

  return doc
}
