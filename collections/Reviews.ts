import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate-collection'

export const Reviews: CollectionConfig = {
    slug: 'reviews',
    labels: {
        singular: 'Review',
        plural: 'Reviews',
    },
    admin: {
        useAsTitle: 'book',
    },
    hooks: {
        afterChange: [revalidateAfterChange(['reviews', 'books'])],
        afterDelete: [revalidateAfterDelete(['reviews', 'books'])],
    },
    fields: [
        {
            name: 'book',
            type: 'relationship',
            relationTo: 'books',
            required: true,
        },
        {
            name: 'reviewerName',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'text',
            required: true,
        }
    ],
}
