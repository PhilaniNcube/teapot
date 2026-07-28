import type { CollectionConfig } from 'payload'

export const Transactions: CollectionConfig = {
  slug: 'transactions',
  labels: {
    singular: 'Transaction',
    plural: 'Transactions',
  },
  admin: {
    useAsTitle: 'pfPaymentId',
    defaultColumns: ['order', 'pfPaymentId', 'paymentStatus', 'amountGross', 'createdAt'],
  },
  access: {
    create: () => false, // Only system server routes can create transactions
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      required: true,
      admin: {
        description: 'Associated order',
      },
    },
    {
      name: 'pfPaymentId',
      type: 'text',
      label: 'Payfast Payment ID',
      admin: {
        description: 'Unique Payfast transaction ID (pf_payment_id)',
      },
    },
    {
      name: 'paymentStatus',
      type: 'text',
      required: true,
      admin: {
        description: 'Payment status returned by Payfast (e.g. COMPLETE, FAILED, CANCELLED)',
      },
    },
    {
      name: 'amountGross',
      type: 'number',
      label: 'Gross Amount',
    },
    {
      name: 'amountFee',
      type: 'number',
      label: 'Payfast Fee',
    },
    {
      name: 'amountNet',
      type: 'number',
      label: 'Net Amount',
    },
    {
      name: 'signature',
      type: 'text',
    },
    {
      name: 'rawPayload',
      type: 'json',
      admin: {
        description: 'Complete raw ITN response data from Payfast',
      },
    },
  ],
}
