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
    series: z.array(z.object({
      id: z.string(),
      title: z.string(),
      category: z.enum(['auto','event','comm','art']),
      year: z.string().optional(),
      kit: z.string().optional(),
      frames: z.array(z.object({ src: z.string(), w: z.number(), h: z.number() })).min(1)
    }))
  })
});

export const collections = { projects, visual };
