import React, { FC } from 'react';
import SiteShell from '../SiteShell';
import { Contact } from '../common/Contact';
import { Divider } from '../core';

const ContactRoot: FC = () => (
  <SiteShell>
    <Divider />
    <Contact isPage={true} />
  </SiteShell>
);

export default ContactRoot;
