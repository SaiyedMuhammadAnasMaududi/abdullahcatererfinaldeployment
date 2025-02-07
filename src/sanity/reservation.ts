import { defineField, defineType } from 'sanity'

export const reservingDestinationSchema = defineType({
  name: 'reservingDestination',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      type: 'string',
      title: 'ID',
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
    }),
    defineField({
      name: 'availability',
      type: 'boolean',
      title: 'Availability',
    }),
    defineField({
      name: 'details',
      type: 'string',
      title: 'Details',
    }),
    defineField({
      name: 'image',
      type: 'string',
      title: 'Image URL',
    }),
  ],
});
