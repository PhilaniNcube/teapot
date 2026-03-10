import {
  formatOrderId,
  OrderEmailLayout,
  type OrderEmailData,
  sampleOrderEmailData,
} from './order-email-layout'

export type OrderConfirmationEmailProps = {
  order?: OrderEmailData
  supportEmail?: string
}

export default function OrderConfirmationEmail({
  order = sampleOrderEmailData,
  supportEmail = 'orders@teapotpublishing.co.za',
}: OrderConfirmationEmailProps) {
  return (
    <OrderEmailLayout
      previewText={`We have received your order ${formatOrderId(order.orderId)}.`}
      recipientLabel="Order confirmation"
      heading="Thanks for your order"
      intro={`We have received your order, ${order.customerName}. We will let you know as soon as it is ready for collection at ${order.collectionPoint}.`}
      closingNote={`If you need to update anything, reply to this email or contact ${supportEmail}.`}
      order={order}
    />
  )
}