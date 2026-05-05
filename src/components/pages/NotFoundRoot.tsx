import React, { FC } from 'react';
import SiteShell from '../SiteShell';
import { Divider } from '../core';

const NotFoundRoot: FC = () => (
  <SiteShell>
    <Divider />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2em',
      }}
    >
      <div>Whoops! We cannot find that page, brb.</div>
      <h1 style={{ fontSize: '5rem' }}>404</h1>
    </div>
  </SiteShell>
);

export default NotFoundRoot;
