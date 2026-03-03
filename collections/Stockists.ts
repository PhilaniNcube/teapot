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