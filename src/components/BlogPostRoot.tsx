import React, { FC, ReactNode } from 'react';
import SiteShell from './SiteShell';
import { BlogPostTemplate } from './BlogPostTemplate';
import { ICrumb } from '@components/common/Breadcrumbs';

interface IPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  categories?: string[];
}

interface IProps {
  post: IPost;
  children?: ReactNode;
  crumbs: ICrumb[];
  pageUrl: string;
}

const BlogPostRoot: FC<IProps> = ({ children, ...props }) => (
  <SiteShell>
    <BlogPostTemplate {...props}>{children}</BlogPostTemplate>
  </SiteShell>
);

export default BlogPostRoot;
