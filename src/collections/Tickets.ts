import type { CollectionConfig } from 'payload'

export const Tickets: CollectionConfig = {
  slug: 'tickets',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'school',
      type: 'text',
      required: true,
    },
    {
      name: 'dietaryPreferences',
      type: 'select',
      options: ['vegan', 'vegetarian'],
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'checkedIn',
      type: 'checkbox',
      defaultValue: false,
      required: true,
    },
  ],
}
