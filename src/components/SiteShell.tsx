import React, { FC, ReactNode, useLayoutEffect, useState } from 'react';

import { Footer, Header } from '@components/common';
import { IAppState } from '@models/AppState';
import { AppState } from '@src/AppState';
import { Breakpoints } from '@styles/index';
import { GlobalStyles } from '@styles/globalStyles';
import { ThemeProvider } from '@styles/styled';
import { theme } from '@styles/theme';

const isSsr = typeof window === 'undefined';

const AppStateWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

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
    <>
      {isSsr ? null : (
        <noscript>
          <style>{'html { visibility: visible !important; }'}</style>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              background: theme.colors.gray04.toString(),
              color: theme.colors.white.toString(),
            }}
          >
            This site works better with JavaScript enabled.
          </div>
        </noscript>
      )}
      <AppStateWrapper>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </AppStateWrapper>
    </>
  );
};

export default SiteShell;
