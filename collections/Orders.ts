import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Order',
    plural: 'Orders',
  },
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: {
        description: 'Linked user account (optional)',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'book',
          type: 'relationship',
          relationTo: 'books',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Price (at time of order)',
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      admin: {
        description: 'Total value of the order including shipping',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
        name: 'shippingMethod',
        type: 'select',
        options: [
            { label: 'Pargo (R100)', value: 'pargo' },
            { label: 'PEP Store (R80)', value: 'pep' },
        ],
        required: true,
    },
    {
        name: 'collectionPoint',
        type: 'text',
        label: 'Collection Point / Store',
        required: true,
        admin: {
            description: 'The specific PEP store or Pargo point selected by the user',
        },
    },
    {
        name: 'shippingCost',
        type: 'number',
        required: true,
        defaultValue: 0,
    },
    {
        name: 'customerDetails',
        type: 'group',
        fields: [
            {
                name: 'firstName',
                type: 'text',
                required: true,
            },
            {
                name: 'lastName',
                type: 'text',
                required: true,
            },
            {
                name: 'email',
                type: 'email',
                required: true,
            },
            {
                name: 'phone',
                type: 'text',
                required: true,
            },
            {
                name: 'address',
                type: 'textarea',
                required: true,
            },
            {
              name: 'city',
              type: 'text',
              required: true,
            },
            {
              name: 'postalCode',
              type: 'text',
              required: true,
            },
             {
              name: 'province',
              type: 'text',
              required: true,
            }
        ]
    }
  ],
}
