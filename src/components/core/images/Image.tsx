import React, { ImgHTMLAttributes } from 'react';
import { border, flexbox, grid, layout, position, space } from 'styled-system';

import { styled, StyledSystemLayoutProps } from '@styles/index';

// Replace gatsby-image with a standard img element
const BaseImage = (props: ImgHTMLAttributes<HTMLImageElement>) => (
  <img {...props} />
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
