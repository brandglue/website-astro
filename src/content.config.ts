import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      type: z.literal('blog-post'),
      title: z.string(),
      author: z.string(),
      date: z.coerce.date(),
      slug: z.string(),
      cover_image: image().optional(),
      categories: z.array(z.string()).optional(),
    }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.object({
      type: z.literal('case-study'),
      client: z.string(),
      title: z.string(),
      description: z.string().optional(),
      slug: z.string(),
      logo: image().optional(),
      // Either "attachment" or "attachments" used across different case studies
      attachment: z.string().optional(),
      attachments: z.string().optional(),
    }),
});

const clients = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/clients' }),
  schema: ({ image }) =>
    z.object({
      type: z.literal('client'),
      name: z.string(),
      slug: z.string().optional(),
      logo: image().optional(),
      order: z.number(),
    }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      type: z.literal('team'),
      name: z.string(),
      title: z.string(),
      image: image().optional(),
      order: z.number(),
      twitter: z.string().nullable().optional(),
      linkedin: z.string().nullable().optional(),
      loves: z.string().optional(),
      goals: z.string().optional(),
    }),
});

const jobs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/jobs' }),
  schema: z.object({
    type: z.literal('job'),
    title: z.string(),
    link: z.string().optional(),
    isActive: z.boolean().default(true),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/services' }),
  schema: z.object({
    type: z.literal('service'),
    title: z.string(),
    shortDescription: z.string(),
    longDescription: z.string().optional(),
    // Stored as a component identifier string (e.g. "CustomerService"), not JSX
    icon: z.string().optional(),
  }),
});

export const collections = {
  blog,
  'case-studies': caseStudies,
  clients,
  team,
  jobs,
  services,
};
