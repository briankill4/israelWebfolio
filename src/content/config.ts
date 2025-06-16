
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
    date: z.string(),
    "time-read": z.number(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
  }),
});

export const collections = {
  posts,
};
