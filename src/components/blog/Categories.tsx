import React, { FC } from 'react';

import { Box } from '@components/core';
import { css, minMediaQuery, rhythm, styled } from '@styles/index';

import { Category } from './Category';

interface ICategoryEntry {
  value: string;
  totalCount: number;
}

interface IProps {
  categories: ICategoryEntry[];
}

export const Categories: FC<IProps> = ({ categories }) => {
  return (
    <CategoryGroup>
      {categories.map(({ totalCount, value }) =>
        value ? (
          <Category key={value} totalCount={totalCount} value={value} />
        ) : null,
      )}
    </CategoryGroup>
  );
};

const CategoryGroup = styled(Box)`
  margin-top: ${rhythm(1)};

  ${minMediaQuery.Medium(css`
    margin-top: 0;
    text-align: right;
  `)}
`;
