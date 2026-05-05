import { color, space, typography } from 'styled-system';

import { customText, styled, StyledSystemTextProps } from '@styles/index';

export const Divider = styled.hr<StyledSystemTextProps>`
  background: ${({ theme }) => theme.colors.blue};
  height: 50px;
  margin-bottom: 0;
  border: none;

  ${color}
  ${space}
  ${typography}
  ${customText}
`;
