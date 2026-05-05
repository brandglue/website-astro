// https://www.styled-components.com/docs/api#typescript

import styled, {
  css,
  createGlobalStyle,
  keyframes,
  withTheme,
  StyleSheetManager,
  ThemeContext,
  ThemeProvider,
} from 'styled-components';

import { ITheme } from './theme';

// Re-export typed versions for use throughout the app
export {
  css,
  createGlobalStyle,
  keyframes,
  StyleSheetManager,
  ThemeContext,
  ThemeProvider,
  withTheme,
};

// Re-export styled as the themed version
export { styled };
export type { ThemedStyledComponentsModule } from 'styled-components';
