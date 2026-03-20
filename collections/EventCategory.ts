import { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate-collection'

export const EventCategory: CollectionConfig = {
  slug: "eventCategories",
  labels: {
    singular: "Event Category",
    plural: "Event Categories",
  },
    admin: {
    useAsTitle: "name",
    defaultColumns: ["name"],
  },
    hooks: {
    afterChange: [revalidateAfterChange(['events', 'past-events', 'all-events'])],
    afterDelete: [revalidateAfterDelete(['events', 'past-events', 'all-events'])],
  },
    fields: [
    {
      name: "name",
      label: "Category Name",   
        type: "text",
        required: true,
    },
  ],
};