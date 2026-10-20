import Typography from 'typography';

import { theme } from './theme';

export const typography = new Typography({
  includeNormalize: true,

  baseFontSize: '19px',
  baseLineHeight: 1.78,
  scaleRatio: 3,

  googleFonts: [
    {
      name: 'Lato',
      styles: ['400', '400i', '700'],
    },
  ],
  headerFontFamily: ['Lato', 'sans-serif'],
  bodyFontFamily: ['Lato', 'sans-serif'],
});

export const { scale, rhythm, options } = typography;

// Site-wide base styles. Plain CSS (not createGlobalStyle) so BaseLayout can render
// it into <head> at build time:
// - it is present in the SSR HTML, so it applies before React hydrates;
// - it survives View Transitions. SC removes a createGlobalStyle's rules when its
//   component unmounts, so between the old island unmounting and the new one
//   hydrating (100-300ms on Netlify) headings lost their colour/uppercase styling.
// The html.no-js visibility rule lives in BaseLayout (with its vt-ready exception).
export const globalCSS = `
  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    background: ${theme.colors.white};
    color: ${theme.colors.gray06};
    overflow: hidden;
  }

  body h1, body h2, body h3, body h4, body h5 {
    font-weight: 700;
    line-height: 1.3;
  }

  body h1, body h2 {
    color: ${theme.colors.darkBlue};
    text-transform: uppercase;
    white-space: pre-wrap;
  }

  body h2 {
    margin-bottom: ${rhythm(1)};
  }

  body h1, body h3, body h4, body h5 {
    margin-bottom: ${rhythm(0.5)};
  }

  body h5 {
    text-transform: uppercase;
  }

  body p {
    font-weight: 400;
  }

  body ul {
    list-style: disc;
  }

  body ol {
    list-style: decimal;
  }

  body li > ol, body li > ul {
    margin-left: 20px;
    margin-bottom: 0;
  }

  body blockquote {
    margin-left: 1em;
    padding-left: 1em;
    border-left: 3px solid ${theme.colors.gray02};
  }

  body em {
    font-style: italic;
  }

  body strong {
    font-weight: 700;
  }

  body a {
    display: inline;
    color: ${theme.colors.blue};
    padding-bottom: 1px;
    border-bottom: 1px solid currentColor;
    text-decoration: none;
    cursor: pointer;
  }

  body a:hover {
    opacity: 0.8;
  }

  /* Styling breadcrumbs here because the Breadcrumb plugin component doesn't give direct access to the parent wrappers */
  .breadcrumb .breadcrumb__list {
    font-size: ${scale(-0.25).fontSize};
    list-style: none;
    margin-left: 0;
    padding-left: 0;
  }

  .breadcrumb .breadcrumb__list__item {
    display: inline;
  }
`;
