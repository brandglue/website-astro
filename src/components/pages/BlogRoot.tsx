import React, { FC } from 'react';
import SiteShell from '../SiteShell';
import { BlogPage } from './BlogPage';

interface IPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImageSrc?: string;
  categories?: string[];
}

interface ICategory {
  value: string;
  totalCount: number;
}

interface IProps {
  posts: IPost[];
  categories: ICategory[];
}

const BlogRoot: FC<IProps> = (props) => (
  <SiteShell>
    <BlogPage {...props} />
  </SiteShell>
);

export default BlogRoot;
