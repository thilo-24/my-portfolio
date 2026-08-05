import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['Software', 'Graphic Design', 'Branding', 'Web App']),
    tags: z.array(z.string()),
    coverImage: z.string(),
    featured: z.boolean().default(false),
    publishDate: z.date(),
    demoUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};