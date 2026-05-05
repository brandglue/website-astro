import React, { FC, ReactNode } from 'react';
import SiteShell from './SiteShell';
import { CaseStudyTemplate } from './CaseStudyTemplate';
import { ICrumb } from '@components/common/Breadcrumbs';

interface ICaseStudy {
  client: string;
  title: string;
  slug: string;
  logoSrc?: string;
  attachment?: string;
}

interface IProps {
  caseStudy: ICaseStudy;
  children?: ReactNode;
  crumbs: ICrumb[];
}

const CaseStudyRoot: FC<IProps> = ({ children, ...props }) => (
  <SiteShell>
    <CaseStudyTemplate {...props}>{children}</CaseStudyTemplate>
  </SiteShell>
);

export default CaseStudyRoot;
