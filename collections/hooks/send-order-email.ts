import { CollectionAfterChangeHook } from 'payload'
import { resend } from '@/lib/resend'
import { Order } from '@/payload-types'

export const sendOrderEmail: CollectionAfterChangeHook<Order> = async ({
  doc,
  req,
  operation,
}) => {
  if (operation === 'create') {
    try {
      let itemsHtml = ''
      
      if (doc.items && doc.items.length > 0) {
        const itemsWithDetails = await Promise.all(
          doc.items.map(async (item) => {
            try {
                // Check if item.book is an object (populated) or ID
                const bookId = typeof item.book === 'object' ? item.book.id : item.book
                
                const book = await req.payload.findByID({
                  collection: 'books',
                  id: bookId,
                })
                return {
                  title: book.title,
                  quantity: item.quantity,
                  price: item.price
                }
            } catch (e) {
                return {
                    title: 'Unknown Book',
                    quantity: item.quantity,
                    price: item.price
                }
            }
          })
        )

        itemsHtml = itemsWithDetails
          .map(
            (item) =>
              `<li>${item.title} (Qty: ${item.quantity}) - R${item.price}</li>`
          )
          .join('')
      }

      const shippingLabel =
        doc.shippingMethod === 'pep_express' 
            ? 'PEP Store (3-5 days) - R120' 
            : 'PEP Store (7-9 days) - R60'

      await resend.emails.send({
        from: process.env.RESEND_SENDER_EMAIL_ADDRESS!,
        to: 'wynnetownsend@gmail.com',
        subject: `New Order Received: #${doc.id}`,
        html: `
            <h1>New Order Received</h1>
            <p><strong>Order ID:</strong> ${doc.id}</p>
            <p><strong>Customer:</strong> ${doc.customerDetails.firstName} ${doc.customerDetails.lastName} (${doc.customerDetails.email})</p>
            <p><strong>Phone:</strong> ${doc.customerDetails.phone}</p>
            <p><strong>Total:</strong> R${doc.total}</p>
            <p><strong>Shipping:</strong> ${shippingLabel} to ${doc.collectionPoint}</p>
            
            <h2>Items:</h2>
            <ul>
                ${itemsHtml}
            </ul>
            
            <h2>Shipping Address:</h2>
            <p>
            ${doc.customerDetails.address}<br/>
            ${doc.customerDetails.city}, ${doc.customerDetails.province}<br/>
            ${doc.customerDetails.postalCode}
            </p>
        `,
      })
    } catch (error) {
      console.error('Error sending order email:', error)
    }
  }
}
