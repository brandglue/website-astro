import React, { FC } from 'react';

import { Box, Image, P, NavLink } from '@components/core';
import { css, minMediaQuery, rhythm, styled } from '@styles/index';
import { TopLevelPages as Pages } from '@utils/routes';

interface ILatestPost {
  slug: string;
  title: string;
  coverImageSrc?: string;
}

interface IProps {
  latestPost?: ILatestPost;
}

export const BlogPost: FC<IProps> = ({ latestPost }) => {
  if (!latestPost) return null;

  return (
    <Box bg="darkBlue">
      <Container variant="section">
        <CoverImage>
          {latestPost.coverImageSrc && (
            <Image
              alt={latestPost.title}
              css={{ borderRadius: '5px' }}
              src={latestPost.coverImageSrc}
              mb={0}
            />
          )}
        </CoverImage>
        <Text>
          <CaseStudyTitle>Latest from the Blog</CaseStudyTitle>
          <P color="white" mb="0">
            {latestPost.title}
          </P>
          <BlogPostLink hasArrow to={`/${Pages.Blog}/${latestPost.slug}/`}>
            Read Blog Post
          </BlogPostLink>
        </Text>
      </Container>
    </Box>
  );
};

const Container = styled(Box)`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;

  ${minMediaQuery.Medium(css`
    flex-flow: row;
    align-items: center;
  `)};
`;

const CoverImage = styled(Box)`
  ${({ theme }) => css`
    flex: auto;
    max-width: 200px;
    margin-bottom: 1em;

    ${minMediaQuery.Medium(css`
      flex: 0 0 200px;
      border-bottom: none;
      border-right: 1px solid ${theme.colors.white};
      padding: 20px 20px 20px 0;
      margin: 20px 20px 20px 0;
    `)}
  `}
`;

const Text = styled(Box)`
  flex: auto;

  ${minMediaQuery.Medium(css`
    flex: 0 0 500px;
  `)};
`;

const CaseStudyTitle = styled.h5`
  ${({ theme }) => css`
    color: ${theme.colors.gold};
    text-transform: uppercase;
    margin-bottom: ${rhythm(0.25)};
  `};
`;

const BlogPostLink = styled(NavLink)`
  ${({ theme }) => css`
    color: ${theme.colors.gold};
  `};
`;

export default BlogPost;
