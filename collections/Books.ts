import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate-collection'

const bookDynamicTag = (doc: Record<string, unknown>) => [`book-${doc.id}`]

export const Books: CollectionConfig = {
    slug: 'books',
    labels: {
        singular: 'Book',
        plural: 'Books',
    },
    hooks: {
        afterChange: [revalidateAfterChange(['books'], bookDynamicTag)],
        afterDelete: [revalidateAfterDelete(['books'], bookDynamicTag)],
    },
    admin: {
        useAsTitle: 'title',
        
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'pages',
            label: 'Number of Pages',
            type: 'number',
            required: true,
        },
        {
            name: 'publishedDate',
            type: 'date',
            required: true,
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'shortDescription',
            label: 'Short Description',
            type: 'text',
            required: false,
        },
        {
            name: 'description',
            label: 'Description',
            type: "richText",
            required: true,
        },
        {
            name: 'price',
            type: 'number',
            required: true,
        }, 
        {
            name: 'inStock',
            type: 'checkbox',
            label: 'In Stock',
            defaultValue: true,
            required: true,
        }
    ],
}