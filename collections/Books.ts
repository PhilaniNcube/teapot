import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
    slug: 'books',
    labels: {
        singular: 'Book',
        plural: 'Books',
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