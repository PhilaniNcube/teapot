import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate-collection'

const blogDynamicTag = (doc: Record<string, unknown>) => [`blog-${doc.id}`]

export const Blogs: CollectionConfig = {
  slug: "blogs",
  labels: {
    singular: "Blog",
    plural: "Blogs",
  },
  admin: {
    useAsTitle: "title",
  },
  hooks: {
    afterChange: [revalidateAfterChange(['blog'], blogDynamicTag)],
    afterDelete: [revalidateAfterDelete(['blog'], blogDynamicTag)],
  },
  fields: [
   
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "gallery",
      label: "Gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};

