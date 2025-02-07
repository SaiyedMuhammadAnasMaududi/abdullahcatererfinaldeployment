import { type SchemaTypeDefinition } from 'sanity'
import { decorationSchema } from './decoration'
import { cateringSchema } from './catering'
import { consultancyManagerSchema } from './cosultancy'
import { reservingDestinationSchema } from './reservation'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [decorationSchema,cateringSchema,consultancyManagerSchema,reservingDestinationSchema
    
  ],
}
