import { CollectionConfig } from "payload";

export const Stockists: CollectionConfig = {
    slug: "stockists",
    labels: {
        singular: "Stockist",
        plural: "Stockists",
    },
    admin: {
        useAsTitle: "name",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
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