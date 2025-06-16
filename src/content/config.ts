import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    promt: z.string().optional(),
    thumbnail: z.string(),
    author: z.string().optional(),
    "time-read": z.number(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    refe: z
      .array(
        z.object({
          author: z.string(),
          link: z.string().url(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  posts,
};
