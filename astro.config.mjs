// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Vite plugin: rewrites `import { ..., styled, ... } from '@styles/index'` (and
 * '@styles/styled') to use `import styled from 'styled-components'` directly.
 *
 * babel-plugin-styled-components only detects imports from 'styled-components'
 * itself — it cannot trace through re-exports. Without the rewrite, SC v6 falls
 * back to a runtime counter that produces different class-name hashes in SSR vs
 * client, causing React #418 hydration mismatches.
 */
function fixStyledImportsForBabel() {
  return {
    name: 'fix-styled-imports-for-babel',
    enforce: /** @type {'pre'} */ ('pre'),
    /**
     * @param {string} code
     * @param {string} id
     */
    transform(code, id) {
      const cleanId = id.replace(/\?.*$/, '');
      if (!/\.(tsx?|jsx?)$/.test(cleanId)) return null;
      // Skip the styles source files themselves to avoid circular rewrites
      if (cleanId.includes('/src/styles/')) return null;
      if (!code.includes('styled') || !code.includes('@styles')) return null;

      let needsDirectImport = false;

      const modified = code.replace(
        /import\s*\{([^}]+)\}\s*from\s*['"]@styles\/(index|styled)['"]/gs,
        (match, importList) => {
          const parts = importList
            .split(',')
            .map((/** @type {string} */ s) => s.trim())
            .filter(Boolean);
          if (!parts.includes('styled')) return match;

          needsDirectImport = true;
          const remaining = parts.filter((/** @type {string} */ s) => s !== 'styled');
          const source = /** @type {RegExpMatchArray} */ (match.match(/from\s*['"]([^'"]+)['"]/))[1];

          if (remaining.length === 0) return '';
          return `import {\n  ${remaining.join(',\n  ')},\n} from '${source}'`;
        },
      );

      if (!needsDirectImport) return null;

      return { code: `import styled from 'styled-components';\n${modified}`, map: null };
    },
  };
}

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
    plugins: [fixStyledImportsForBabel()],
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