import React, { FC, useContext } from 'react';

import { Box } from '@components/core';
import heroVideo from '@media/videos/hero-homepage.mp4';
import { AppState } from '@src/AppState';
import { css, minMediaQuery, scale, styled } from '@styles/index';

interface IProps {
  posterSrc?: string;
}

export const Hero: FC<IProps> = ({ posterSrc }) => {
  const { isSmallDevice } = useContext(AppState);

  return (
    <Container>
      {!isSmallDevice && (
        <HeroVideo autoPlay loop muted poster={posterSrc}>
          <source src={heroVideo} type="video/mp4" />
        </HeroVideo>
      )}
      <Header>
        <Tagline>
          We are a social media agency.
          <span>Reaching your audience in the places they hang out most.</span>
        </Tagline>
      </Header>
    </Container>
  );
};

const Container = styled(Box)`
  position: relative;
`;

// Explicit height (not just max-height) so the box is reserved before the video's
// poster/metadata load — otherwise it lays out at 0px for a frame and pushes the
// rest of the page down (CLS ~0.22 on cold loads).
const HeroVideo = styled.video`
  height: 400px;
  max-height: 400px;
  width: 100%;
  object-fit: cover;
  filter: brightness(0.8);
`;

const Header = styled(Box)`
  ${({ theme }) => css`
    max-width: ${theme.spacings.maxContentColWidth};
    margin: auto;
    padding: 1em;
    background: ${theme.colors.blue};
    color: ${theme.colors.white};

    ${minMediaQuery.Medium(css`
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      flex-flow: column;
      justify-content: center;
      text-align: center;
      background: none;
    `)};
  `};
`;

const Tagline = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${scale(0.4).fontSize};
    line-height: ${scale(0.4).lineHeight};
    margin-bottom: 0;

    span {
      display: inline-block;
      font-size: ${scale(0.1).fontSize};
      text-transform: none;
    }

    ${minMediaQuery.Medium(css`
      font-size: ${scale(0.8).fontSize};
      line-height: ${scale(0.6).lineHeight};

      span {
        font-size: ${scale(0.2).fontSize};
      }
    `)}

    ${minMediaQuery.Large(css`
      font-size: ${scale(1).fontSize};
      line-height: ${scale(0.6).lineHeight};

      span {
        font-size: ${scale(0.4).fontSize};
      }
    `)}
  `}
`;
