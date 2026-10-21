import type { APIRoute } from 'astro';

import { globalCSS, typography } from '@styles/globalStyles';

// Stylesheet for the Decap CMS preview pane (registered in public/admin/index.html).
// Built from the same Typography.js + global styles the site uses, so blog post
// and case study previews match the live typography without duplicating CSS.
export const GET: APIRoute = () =>
  new Response(
    // @import must come first; same Lato weights BaseLayout loads for the site.
    `@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&display=swap');
${typography.toString()}
${globalCSS}
body {
  margin: 2em;
  overflow: auto;
}
`,
    { headers: { 'Content-Type': 'text/css; charset=utf-8' } },
  );
