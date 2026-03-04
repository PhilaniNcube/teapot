import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate-collection'

const galleryDynamicTag = (doc: Record<string, unknown>) => [`gallery-${doc.id}`]

export const Gallery: CollectionConfig = {
  slug: "gallery",
  labels: {
    singular: "Gallery Item",
    plural: "Gallery",
  },
  hooks: {
    afterChange: [revalidateAfterChange(['gallery'], galleryDynamicTag)],
    afterDelete: [revalidateAfterDelete(['gallery'], galleryDynamicTag)],
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: false,
    },
    {
      name: "images",
      label: "Images",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "image",
          label: "Image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          label: "Caption",
          type: "text",
          required: false,
        },
        {
          name: "altText",
          label: "Alt Text",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        {
          label: "Events",
          value: "events",
        },
        {
          label: "Products",
          value: "products",
        },
        {
          label: "General",
          value: "general",
        },
      ],
      required: false,
    },
    {
      name: "featured",
      label: "Featured",
      type: "checkbox",
      defaultValue: false,
      required: false,
    },
  ],
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "featured"],
  },
};
