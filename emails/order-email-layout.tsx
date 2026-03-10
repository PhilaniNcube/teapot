import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export type OrderEmailItem = {
  title: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export type OrderEmailData = {
  orderId: number
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingMethodLabel: string
  collectionPoint: string
  shippingCost: number
  total: number
  addressLines: string[]
  items: OrderEmailItem[]
}

type OrderEmailLayoutProps = {
  previewText: string
  recipientLabel: string
  heading: string
  intro: string
  closingNote?: string
  order: OrderEmailData
}

const currencyFormatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
})

export const sampleOrderEmailData: OrderEmailData = {
  orderId: 1024,
  customerName: 'Barbara Townsend',
  customerEmail: 'reader@example.com',
  customerPhone: '083 315 9211',
  shippingMethodLabel: 'PEP Store (3-5 days) - R120',
  collectionPoint: 'PEP Store, Sandton City',
  shippingCost: 120,
  total: 520,
  addressLines: ['15 Oak Street', 'Johannesburg, Gauteng', '2196'],
  items: [
    {
      title: 'A Story Worth Keeping',
      quantity: 2,
      unitPrice: 200,
      lineTotal: 400,
    },
  ],
}

export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

export function formatOrderId(orderId: number) {
  return `#${orderId}`
}

export function OrderEmailLayout({
  previewText,
  recipientLabel,
  heading,
  intro,
  closingNote,
  order,
}: OrderEmailLayoutProps) {
  const itemsSubtotal = order.items.reduce(
    (total, item) => total + item.lineTotal,
    0
  )

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={heroSection}>
            <Text style={brand}>Teapot Publishing</Text>
            <Text style={pill}>{recipientLabel}</Text>
            <Heading style={headingStyle}>{heading}</Heading>
            <Text style={introStyle}>{intro}</Text>
          </Section>

          <Section style={panel}>
            <Text style={sectionLabel}>Order details</Text>
            <Text style={detailLine}>
              <strong>Order number:</strong> {formatOrderId(order.orderId)}
            </Text>
            <Text style={detailLine}>
              <strong>Collection point:</strong> {order.collectionPoint}
            </Text>
            <Text style={detailLine}>
              <strong>Shipping method:</strong> {order.shippingMethodLabel}
            </Text>
          </Section>

          <Section style={panel}>
            <Text style={sectionLabel}>Items</Text>
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={table}
            >
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={`${item.title}-${index}`}>
                    <td style={itemInfoCell}>
                      <Text style={itemTitle}>{item.title}</Text>
                      <Text style={itemMeta}>
                        Qty {item.quantity} x {formatCurrency(item.unitPrice)}
                      </Text>
                    </td>
                    <td align="right" style={itemTotalCell}>
                      <Text style={itemTotal}>{formatCurrency(item.lineTotal)}</Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Hr style={divider} />

            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={table}
            >
              <tbody>
                <tr>
                  <td style={summaryLabelCell}>Items subtotal</td>
                  <td align="right" style={summaryValueCell}>
                    {formatCurrency(itemsSubtotal)}
                  </td>
                </tr>
                <tr>
                  <td style={summaryLabelCell}>Shipping</td>
                  <td align="right" style={summaryValueCell}>
                    {formatCurrency(order.shippingCost)}
                  </td>
                </tr>
                <tr>
                  <td style={totalLabelCell}>Total</td>
                  <td align="right" style={totalValueCell}>
                    {formatCurrency(order.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Section style={panel}>
            <Text style={sectionLabel}>Customer</Text>
            <Text style={detailLine}>{order.customerName}</Text>
            <Text style={detailLine}>{order.customerEmail}</Text>
            <Text style={detailLine}>{order.customerPhone}</Text>
          </Section>

          <Section style={panel}>
            <Text style={sectionLabel}>Shipping address</Text>
            {order.addressLines.map((line, index) => (
              <Text key={`${line}-${index}`} style={detailLine}>
                {line}
              </Text>
            ))}
          </Section>

          {closingNote ? <Text style={closingNoteStyle}>{closingNote}</Text> : null}
          <Text style={footerStyle}>Teapot Publishing</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f4efe7',
  color: '#2f241a',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: '32px 16px',
}

const container = {
  margin: '0 auto',
  maxWidth: '600px',
}

const heroSection = {
  backgroundColor: '#2f241a',
  borderRadius: '20px',
  padding: '32px',
  marginBottom: '20px',
}

const brand = {
  color: '#f7d48f',
  fontSize: '13px',
  fontWeight: '700',
  letterSpacing: '1.2px',
  margin: '0 0 12px',
  textTransform: 'uppercase' as const,
}

const pill = {
  backgroundColor: '#f7d48f',
  borderRadius: '999px',
  color: '#2f241a',
  display: 'inline-block',
  fontSize: '12px',
  fontWeight: '700',
  margin: '0 0 18px',
  padding: '6px 12px',
}

const headingStyle = {
  color: '#fff8ef',
  fontSize: '30px',
  fontWeight: '700',
  lineHeight: '1.2',
  margin: '0 0 12px',
}

const introStyle = {
  color: '#f4ddc1',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: 0,
}

const panel = {
  backgroundColor: '#ffffff',
  border: '1px solid #e6ddd2',
  borderRadius: '18px',
  marginBottom: '16px',
  padding: '24px',
}

const sectionLabel = {
  color: '#7b5a36',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '1.1px',
  margin: '0 0 14px',
  textTransform: 'uppercase' as const,
}

const detailLine = {
  color: '#2f241a',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 8px',
}

const table = {
  borderCollapse: 'collapse' as const,
}

const itemInfoCell = {
  padding: '0 0 12px',
  verticalAlign: 'top' as const,
}

const itemTotalCell = {
  padding: '0 0 12px 12px',
  verticalAlign: 'top' as const,
}

const itemTitle = {
  color: '#2f241a',
  fontSize: '15px',
  fontWeight: '600',
  lineHeight: '1.5',
  margin: 0,
}

const itemMeta = {
  color: '#75675b',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '4px 0 0',
}

const itemTotal = {
  color: '#2f241a',
  fontSize: '15px',
  fontWeight: '600',
  lineHeight: '1.5',
  margin: 0,
}

const divider = {
  borderColor: '#e6ddd2',
  margin: '8px 0 16px',
}

const summaryLabelCell = {
  color: '#75675b',
  fontSize: '14px',
  padding: '0 0 10px',
}

const summaryValueCell = {
  color: '#2f241a',
  fontSize: '14px',
  padding: '0 0 10px 12px',
}

const totalLabelCell = {
  color: '#2f241a',
  fontSize: '16px',
  fontWeight: '700',
  padding: '4px 0 0',
}

const totalValueCell = {
  color: '#2f241a',
  fontSize: '16px',
  fontWeight: '700',
  padding: '4px 0 0 12px',
}

const closingNoteStyle = {
  color: '#5f5145',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '20px 0 8px',
}

const footerStyle = {
  color: '#8a7b6c',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: 0,
  textAlign: 'center' as const,
}