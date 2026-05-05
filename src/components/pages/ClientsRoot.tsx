import React, { FC } from 'react';
import SiteShell from '../SiteShell';
import { ClientsPage } from './ClientsPage';

interface IClient {
  name: string;
  logoSrc?: string;
}

interface IProps {
  clients: IClient[];
}

const ClientsRoot: FC<IProps> = (props) => (
  <SiteShell>
    <ClientsPage {...props} />
  </SiteShell>
);

export default ClientsRoot;
