import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate-collection'

const validateReviewLink = (value: string | null | undefined) => {
    if (!value) {
        return true
    }

    try {
        const url = new URL(value)

        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            return 'Link must be a valid URL.'
        }

        return true
    } catch {
        return 'Link must be a valid URL.'
    }
}

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
            name: 'selfPublishing',
            type: 'checkbox',
            required: false,
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
        }, 
        {
            name: 'longContent',
            type: "richText",
            required: false,
                
        }, 
        {
            name: 'link',
            type:'text',
            required: false,
            validate: validateReviewLink,
        }, 
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: false,
        }
    ],
}
