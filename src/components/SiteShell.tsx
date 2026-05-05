import React, { FC, ReactNode, useLayoutEffect, useState } from 'react';
import isPropValid from '@emotion/is-prop-valid';

import { Footer, Header } from '@components/common';
import { IAppState } from '@models/AppState';
import { AppState } from '@src/AppState';
import { Breakpoints } from '@styles/index';
import { GlobalStyles } from '@styles/globalStyles';
import { StyleSheetManager, ThemeProvider } from '@styles/styled';
import { theme } from '@styles/theme';

// SVG element tag names — all props should be forwarded for these.
// @emotion/is-prop-valid only covers HTML attributes so SVG-specific ones
// (viewBox, xmlns, fill, etc.) used by styled-icons get incorrectly filtered.
const SVG_TAGS = new Set([
  'svg', 'path', 'g', 'circle', 'rect', 'line', 'polyline', 'polygon',
  'ellipse', 'defs', 'use', 'symbol', 'clipPath', 'mask', 'filter',
  'linearGradient', 'radialGradient', 'stop', 'text', 'tspan', 'image',
  'pattern', 'marker', 'switch', 'foreignObject',
]);

// SC v6 StyleSheetManager shouldForwardProp receives (propName, target) where
// target is either a DOM element string ('div', 'svg', ...) or a React component.
//
// - React components: forward all props — the component handles its own filtering.
//   This covers styled-icons' StyledIconBase (= styled(ReactComponent)) which carries
//   SVG attrs (viewBox, fill, xmlns) as regular props.
// - SVG element strings ('svg', 'path', ...): forward all props (SVG has attrs that
//   @emotion/is-prop-valid doesn't know about).
// - HTML element strings ('div', 'a', ...): filter via @emotion/is-prop-valid to
//   suppress styled-system prop warnings (variant, mb, etc.).
function shouldForwardProp(prop: string, target: unknown): boolean {
  if (typeof target !== 'string') return true;   // React component → pass everything
  if (SVG_TAGS.has(target)) return true;          // SVG element → pass everything
  return isPropValid(prop);                        // HTML element → filter unknown props
}

const AppStateWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Sync in case the window resized between SSR and hydration
    handleResize();

    // Make page visible now that React has rendered with the correct window width.
    // This prevents a flash of the SSR layout (which assumes a small screen).
    document.documentElement.classList.replace('no-js', 'js');

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const state: IAppState = {
    isLargeDevice: windowWidth >= Breakpoints.Large,
    isMediumDevice:
      windowWidth >= Breakpoints.Medium && windowWidth < Breakpoints.Large,
    isSmallDevice: windowWidth < Breakpoints.Medium,
  };

  return <AppState.Provider value={state}>{children}</AppState.Provider>;
};

interface IProps {
  children: ReactNode;
}

const SiteShell: FC<IProps> = ({ children }) => {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <AppStateWrapper>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </AppStateWrapper>
    </StyleSheetManager>
  );
};

export default SiteShell;
