import { kebabCase } from 'lodash-es';
import React, { FC } from 'react';

import { Contact } from '@components/common';
import { Box, Divider, H1, Image, P } from '@components/core';
import { css, minMediaQuery, rhythm, styled } from '@styles/index';

interface IClient {
  name: string;
  logoSrc?: string;
}

interface IProps {
  clients: IClient[];
}

export const ClientsPage: FC<IProps> = ({ clients }) => {
  return (
    <>
      <Divider />
      <Box pb={0} variant="section">
        <H1>See the list of clients we&apos;ve helped.</H1>
        <P>
          From developing social strategies to event social management, we've
          done a lot. Check out some of our clients below and get in touch to
          receive our most recent portfolio of work.
        </P>
      </Box>
      <Box variant="section">
        <ClientGrid>
          {clients.map((client) => (
            <ClientLogoWrapper key={client.name}>
              {client.logoSrc && (
                <Image
                  alt={kebabCase(client.name)}
                  src={client.logoSrc}
                  style={{ objectFit: 'contain', maxWidth: '200px' }}
                />
              )}
            </ClientLogoWrapper>
          ))}
        </ClientGrid>
      </Box>
      <Divider />
      <Contact />
    </>
  );
};

const ClientGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: minmax(20px, 150px);
  grid-gap: 20px;
  margin-bottom: ${rhythm(1)};
  ${minMediaQuery.Small(css`
    grid-template-columns: 1fr 1fr;
  `)}
  ${minMediaQuery.Medium(css`
    grid-template-columns: repeat(3, minmax(0, 1fr));
  `)}
  ${minMediaQuery.Large(css`
    grid-template-columns: repeat(4, minmax(0, 1fr));
  `)}
`;

const ClientLogoWrapper = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img {
    object-fit: contain !important;
    max-width: 200px;
    max-height: 100%;
  }
  ${minMediaQuery.Small(css`
    flex-basis: 20%;
    margin-bottom: 0;
  `)}
`;
