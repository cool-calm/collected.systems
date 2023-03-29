import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import mdx from "@astrojs/mdx";
import deno from '@astrojs/deno';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: deno(),
	server: {
		port: 5999,
	},
	integrations: [
		// Enable Preact to support Preact JSX components.
		preact(),
		// Enable React for the Algolia search component.
		react(),
		mdx()
	],
	site: `http://astro.build`,
  vite: {
    ssr: {
      external: ["fs"]
    }
  }
});
