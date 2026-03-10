import {
  formatOrderId,
  OrderEmailLayout,
  type OrderEmailData,
  sampleOrderEmailData,
} from './order-email-layout'

export type OrderNotificationEmailProps = {
  order?: OrderEmailData
}

export default function OrderNotificationEmail({
  order = sampleOrderEmailData,
}: OrderNotificationEmailProps) {
  return (
    <OrderEmailLayout
      previewText={`New order ${formatOrderId(order.orderId)} from ${order.customerName}.`}
      recipientLabel="New order notification"
      heading="A new order has been placed"
      intro={`${order.customerName} has completed checkout. Review the order details below and begin fulfilment when ready.`}
      closingNote="Reply directly to this email to contact the customer from your inbox, or update the order status in the admin panel as fulfilment progresses."
      order={order}
    />
  )
}