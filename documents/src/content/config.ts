import { defineCollection, z } from 'astro:content';

const document = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { document };
