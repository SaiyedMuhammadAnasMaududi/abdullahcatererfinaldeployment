import { defineField, defineType } from 'sanity'

export const cateringSchema = defineType({
  name: 'catering',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      type: 'number',
      title: 'ID',
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'details',
      type: 'string',
      title: 'Details',
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
    }),
    defineField({
      name: 'image',
      type: 'string',
      title: 'Image URL',
    }),
  ],
});
