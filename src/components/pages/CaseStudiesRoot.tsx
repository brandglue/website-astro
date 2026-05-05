import React, { FC } from 'react';
import SiteShell from '../SiteShell';
import { CaseStudiesPage } from './CaseStudiesPage';

interface ICaseStudy {
  client: string;
  title: string;
  description?: string;
  slug: string;
  logoSrc?: string;
}

interface IProps {
  caseStudies: ICaseStudy[];
}

const CaseStudiesRoot: FC<IProps> = (props) => (
  <SiteShell>
    <CaseStudiesPage {...props} />
  </SiteShell>
);

export default CaseStudiesRoot;
