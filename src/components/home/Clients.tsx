import { FC } from 'react';

import { Box, Image } from '@components/core';
import { styled } from '@styles/index';

interface ILogo {
  name: string;
  src: string;
}

interface IProps {
  logos: ILogo[];
}

export const Clients: FC<IProps> = ({ logos }) => {
  return (
    <Box variant="section">
      <ClientGrid>
        {logos.map((logo) => (
          <Image key={logo.name} alt={logo.name} src={logo.src} mb={0} />
        ))}
      </ClientGrid>
    </Box>
  );
};

const ClientGrid = styled(Box)`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 50px;
`;
