import { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate-collection'

export const Events: CollectionConfig = {
  slug: "events",
  labels: {
    singular: "Event",
    plural: "Events",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "venue", "eventType", "status"],
  },
  hooks: {
    afterChange: [revalidateAfterChange(['events', 'past-events', 'all-events'])],
    afterDelete: [revalidateAfterDelete(['events', 'past-events', 'all-events'])],
  },
  fields: [
    {
      name: "title",
      label: "Event Title",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "date",
          label: "Date",
          type: "date",
          required: true,
          admin: {
            width: "50%",
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "d MMM yyyy",
            },
          },
        },
        {
          name: "time",
          label: "Time",
          type: "text",
          required: true,
          admin: {
            width: "50%",
            placeholder: "e.g. 10:00 AM – 2:00 PM",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "venue",
          label: "Venue",
          type: "text",
          required: true,
          admin: {
            width: "50%",
            placeholder: "e.g. Exclusive Books, V&A Waterfront",
          },
        },
        {
          name: "location",
          label: "City / Area",
          type: "text",
          required: true,
          admin: {
            width: "50%",
            placeholder: "e.g. Cape Town",
          },
        },
      ],
    },
    {
      name: "category",
      label: "Event Category",
      type: "relationship",
      relationTo: "eventCategories",
      required: false,
    },
    {
      name: "eventType",
      label: "Type of Event",
      type: "select",
      required: false,
      defaultValue: "book-signing",
      options: [
        { label: "Book Signing", value: "book-signing" },
        { label: "Book Launch", value: "book-launch" },
        {label: "Meet the Author", value: "meet-the-author" },
        { label: "Reading", value: "reading" },
        { label: "Talk / Lecture", value: "talk" },
        { label: "Festival", value: "festival" },
        { label: "Workshop", value: "workshop" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "richText",
      required: false,
    },
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "status",
      label: "Event Status",
      type: "select",
      defaultValue: "upcoming",
      required: true,
      options: [
        { label: "Upcoming", value: "upcoming" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Completed", value: "completed" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
