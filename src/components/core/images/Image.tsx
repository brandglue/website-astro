import React, { ImgHTMLAttributes } from 'react';
import { border, flexbox, grid, layout, position, space } from 'styled-system';

import { styled, StyledSystemLayoutProps } from '@styles/index';

// Replace gatsby-image with a standard img element.
// Default to loading="lazy" so React 19 does not emit an inline <link rel="preload">
// hint during SSR — React 19 only preloads non-lazy images, and the inline hint
// causes a hydration mismatch because the client hoists it to <head> instead.
const BaseImage = ({ loading = 'lazy', ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
  <img loading={loading} {...props} />
);

export const Image = styled(BaseImage)<StyledSystemLayoutProps>`
  max-width: 100%;
  display: block;

  ${border}
  ${flexbox}
  ${grid}
  ${layout}
  ${position}
  ${space}
`;
