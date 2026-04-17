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
        videoFile?: unknown
    }
}

const validateVideoUrl = (value: string | null | undefined, context?: ReviewValidationContext) => {
    if (context?.siblingData?.reviewType !== 'video') {
        return true
    }

    if (!value && !context?.siblingData?.videoFile) {
        return 'Provide a video upload or a hosted video URL for video reviews.'
    }

    if (!value) {
        return true
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
                description: 'Optional if a video upload is selected below.',
                condition: (_, siblingData) => siblingData?.reviewType === 'video',
            },
            validate: validateVideoUrl,
        },
        {
            name: 'videoFile',
            type: 'upload',
            relationTo: 'media',
            required: false,
            admin: {
                description: 'Upload a video file to Payload media storage.',
                condition: (_, siblingData) => siblingData?.reviewType === 'video',
            },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: false,
        }
    ],
}
