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

type ReviewType = 'text' | 'video'

type ReviewValidationContext = {
    siblingData?: {
        reviewType?: ReviewType
    }
}

const validateVideoUrl = (value: string | null | undefined, context?: ReviewValidationContext) => {
    if (context?.siblingData?.reviewType !== 'video') {
        return true
    }

    if (!value) {
        return 'Video URL is required for video reviews.'
    }

    return validateReviewLink(value)
}

const validateReviewContent = (value: string | null | undefined, context?: ReviewValidationContext) => {
    if (context?.siblingData?.reviewType === 'video') {
        return true
    }

    if (!value || value.trim().length === 0) {
        return 'Content is required for text reviews.'
    }

    return true
}

export const Reviews: CollectionConfig = {
    slug: 'reviews',
    labels: {
        singular: 'Review',
        plural: 'Reviews',
    },
    admin: {
        useAsTitle: 'reviewerName',
    },
    hooks: {
        afterChange: [revalidateAfterChange(['reviews', 'books'])],
        afterDelete: [revalidateAfterDelete(['reviews', 'books'])],
    },
    fields: [
        {
            name: 'reviewType',
            type: 'select',
            required: false,
            defaultValue: 'text',
            options: [
                {
                    label: 'Text review',
                    value: 'text',
                },
                {
                    label: 'Video review',
                    value: 'video',
                },
            ],
        },
        {
            name: 'book',
            type: 'relationship',
            relationTo: 'books',
            required: false,
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
            required: false,
            validate: validateReviewContent,
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
            name: 'videoUrl',
            type: 'text',
            required: false,
            admin: {
                description: 'Add a hosted video URL (for example YouTube, Vimeo, or your own hosted MP4).',
                condition: (_, siblingData) => siblingData?.reviewType === 'video',
            },
            validate: validateVideoUrl,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: false,
        }
    ],
}
