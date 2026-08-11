import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    kind: z.string(),
    image: z.string(),
    summary: z.string(),
    meta: z.array(z.object({
      label: z.string(),
      value: z.string(),
      highlight: z.boolean().optional()
    })),
    gallery: z.array(z.object({
      src: z.string(),
      caption: z.string().optional()
    })).optional()
  })
});

const visual = defineCollection({
  loader: glob({ pattern: 'visual.md', base: './content' }),
  schema: z.object({
    shots: z.array(z.object({
      src: z.string(),
      category: z.enum(['auto','comm','event','personal','exhib']),
      label: z.string(),
      title: z.string(),
      kit: z.string().optional(),
      year: z.string().optional()
    }))
  })
});

export const collections = { projects, visual };
