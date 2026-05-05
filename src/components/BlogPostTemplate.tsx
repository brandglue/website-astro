import React, { FC, ReactNode } from 'react';

import { Category, Share } from '@components/blog';
import { Breadcrumbs, ICrumb } from '@components/common/Breadcrumbs';
import { Box, Divider, H2, Span } from '@components/core';
import { css, minMediaQuery, rhythm, scale, styled } from '@styles/index';

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

export const BlogPostTemplate: FC<IProps> = ({ post, children, crumbs, pageUrl }) => {
  return (
    <>
      <Divider />
      <PostWrapper>
        <Breadcrumbs crumbs={crumbs} />
        <H2>{post.title}</H2>
        <PostHeader>
          <Meta>
            {post.author}
            <Sep />
            {post.date}
          </Meta>
          <Categories>
            {post.categories?.map((category) => (
              <Category key={category} value={category} />
            ))}
          </Categories>
        </PostHeader>
        <PostBody>{children}</PostBody>
        <Share url={pageUrl} />
      </PostWrapper>
    </>
  );
};

const PostWrapper = styled(Box)`
  max-width: ${({ theme }) => theme.spacings.maxTextColWidth};
  padding: ${rhythm(1)};
  margin: auto;
`;

const PostHeader = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    color: ${theme.colors.gray04};
    border-bottom: 4px solid ${theme.colors.blue};
    font-size: ${scale(-0.1).fontSize};
    line-height: ${scale(-0.1).lineHeight};
    margin-bottom: ${rhythm(1)};

    ${minMediaQuery.Medium(css`
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    `)}
  `}
`;

const Meta = styled.span`
  margin-bottom: ${rhythm(0.5)};

  ${minMediaQuery.Medium(css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
  `)}
`;

const Sep = styled.span`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width: 30px;
  height: 3px;
  margin: 0 10px;

  &:after {
    content: '';
    position: absolute;
    height: 3px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray02};
  }
`;

const Categories = styled(Span)`
  margin-bottom: ${rhythm(0.5)};

  ${minMediaQuery.Medium(css`
    margin-left: auto;
    margin-bottom: 0;
  `)}
`;

const PostBody = styled(Box)`
  margin-bottom: ${rhythm(2)};
`;
