import React, { FC } from 'react';
import SiteShell from '../SiteShell';
import { Hero } from './Hero';
import { Team } from './Team';
import { Clients } from './Clients';
import { BlogPost } from './BlogPost';
import { Services } from './Services';
import { Contact } from '../common/Contact';
import { Box, Divider } from '../core';

interface ITeamMember {
  name: string;
  imageSrc?: string;
}

interface ILogo {
  name: string;
  src: string;
}

interface ILatestPost {
  slug: string;
  title: string;
  coverImageSrc?: string;
}

interface IService {
  title: string;
  shortDescription: string;
  icon?: string;
}

interface IProps {
  posterSrc: string;
  teamMembers: ITeamMember[];
  logos: ILogo[];
  latestPost?: ILatestPost;
  services: IService[];
}

const HomeRoot: FC<IProps> = ({ posterSrc, teamMembers, logos, latestPost, services }) => (
  <SiteShell>
    <Box>
      <Hero posterSrc={posterSrc} />
      <Team teamMembers={teamMembers} />
      <Clients logos={logos} />
      <BlogPost latestPost={latestPost} />
      <Services services={services} />
      <Divider />
      <Contact />
    </Box>
  </SiteShell>
);

export default HomeRoot;
