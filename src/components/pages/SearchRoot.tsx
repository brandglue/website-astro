import React, { FC } from 'react';
import SiteShell from '../SiteShell';
import { SearchPage } from './SearchPage';

interface ICrumb {
  label: string;
  href: string;
}

interface IProps {
  crumbs: ICrumb[];
}

const SearchRoot: FC<IProps> = (props) => (
  <SiteShell>
    <SearchPage {...props} />
  </SiteShell>
);

export default SearchRoot;
