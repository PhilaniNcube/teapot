import type { CollectionConfig } from "payload";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  labels: {
    singular: "Gallery Item",
    plural: "Gallery",
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
