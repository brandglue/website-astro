import React, { FC } from 'react';
import SiteShell from '../SiteShell';
import { AboutPage } from './AboutPage';

interface ITeamMember {
  name: string;
  title: string;
  imageSrc?: string;
  twitter: string | null;
  linkedin: string | null;
  loves?: string;
  goals?: string;
}

interface IJob {
  title: string;
  link?: string;
}

interface IProps {
  team: ITeamMember[];
  jobs: IJob[];
}

const AboutRoot: FC<IProps> = (props) => (
  <SiteShell>
    <AboutPage {...props} />
  </SiteShell>
);

export default AboutRoot;
