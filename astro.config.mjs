// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'



// https://astro.build/config
export default defineConfig({
  markdown: { 
    remarkPlugins: [remarkGfm, remarkBreaks], 
    html: true,
    shikiConfig: {
      theme: 'vitesse-dark',
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
  
});


