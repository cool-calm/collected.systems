import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import mdx from "@astrojs/mdx";
import deno from '@astrojs/deno';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

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
    },
    resolve: {
      alias: {
        // punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
          // NodeGlobalsPolyfillPlugin({
          //   process: false,
          //   buffer: true
          // }),
          // NodeModulesPolyfillPlugin()
        ]
      }
    },
    build: {
      rollupOptions: {
        plugins: [
          // Enable rollup polyfills plugin
          // used during production bundling
          // rollupNodePolyFill({
          //   exclude: ["process"]
          // })
        ]
      }
    }
  }
});
