// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://brandglue.com',
  trailingSlash: 'always',
  integrations: [
    react({
      babel: {
        plugins: [['babel-plugin-styled-components', { ssr: true, displayName: true, pure: true }]],
      },
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    ssr: {
      noExternal: ['styled-components', 'styled-system', 'styled-icons', '@styled-system/css', 'stylis'],
    },
    resolve: {
      alias: {
        'styled-components': 'styled-components/dist/styled-components.esm.js',
        '@components': '/src/components',
        '@hooks': '/src/hooks',
        '@media': '/src/media',
        '@models': '/src/models',
        '@src': '/src',
        '@styles': '/src/styles',
        '@utils': '/src/utils',
      },
    },
  },
});