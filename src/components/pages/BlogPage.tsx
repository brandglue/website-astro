import { chunk } from 'lodash-es';
import React, { FC, useEffect, useState } from 'react';

import { ActionBar, LoadMore, Previews } from '@components/blog';
import { Box, Divider, P, H1 } from '@components/core';

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

export const BlogPage: FC<IProps> = ({ posts, categories }) => {
  const [page, setPage] = useState(1);
  const [allLoaded, setAllLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const postsPerChunk = 5;

  useEffect(() => {
    document.documentElement.scrollTop = scrollPosition;
  }, [page, scrollPosition]);

  const handleLoadMore = () => {
    const pageCount = page + 1;
    setPage(pageCount);
    setScrollPosition(
      document.documentElement.scrollTop || document.body.scrollTop,
    );
    if (pageCount * postsPerChunk >= posts.length) {
      setAllLoaded(true);
    }
  };

  const renderChunks = () => {
    const chunks = chunk(posts, postsPerChunk);
    const paginated = chunks.slice(0, page);
    return paginated.map((group, index) => (
      <Previews key={index} blogPosts={group} index={index} />
    ));
  };

  return (
    <Box>
      <Divider />
      <Box pb={0} variant="section">
        <H1>There is a lot going on out there in the social sphere.</H1>
        <P>Here&apos;s what we&apos;ve got to say about it.</P>
        <ActionBar categories={categories} />
      </Box>
      {renderChunks()}
      <Box pt={0} variant="section">
        <LoadMore allLoaded={allLoaded} handleLoadMore={handleLoadMore} />
      </Box>
    </Box>
  );
};
