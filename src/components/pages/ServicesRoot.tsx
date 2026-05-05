import React, { FC } from 'react';
import SiteShell from '../SiteShell';
import { ServicesPage } from './ServicesPage';

interface IService {
  title: string;
  shortDescription: string;
  longDescription?: string;
  icon?: string;
}

interface IProps {
  services: IService[];
}

const ServicesRoot: FC<IProps> = (props) => (
  <SiteShell>
    <ServicesPage {...props} />
  </SiteShell>
);

export default ServicesRoot;
