import { defineField, defineType } from 'sanity'

export const consultancyManagerSchema = defineType({
  name: 'consultancyManager',
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
      name: 'availability',
      type: 'boolean',
      title: 'Availability',
    }),
    defineField({
      name: 'specialization',
      type: 'string',
      title: 'Specialization',
    }),
  ],
});
