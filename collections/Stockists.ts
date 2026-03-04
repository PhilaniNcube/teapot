import { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate-collection'

const stockistDynamicTag = (doc: Record<string, unknown>) => [`stockist-${doc.id}`]

export const Stockists: CollectionConfig = {
    slug: "stockists",
    labels: {
        singular: "Stockist",
        plural: "Stockists",
    },
    admin: {
        useAsTitle: "name",
    },
    hooks: {
        afterChange: [revalidateAfterChange(['stockists'], stockistDynamicTag)],
        afterDelete: [revalidateAfterDelete(['stockists'], stockistDynamicTag)],
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "town",
            type: "text",
            required: true,
            admin: {
                description: "The town or city where the stockist is located (e.g. Cape Town, Grabouw)",
            },
        },
        {
            name: "address",
            type: "text",
            required: true,
        },
        {
            name: 'contact',
            type: 'text',
        }, 
        {
            name: 'email',
            type: 'email',
        }
    ],
}