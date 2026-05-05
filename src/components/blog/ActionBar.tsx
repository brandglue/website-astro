import React, { FC } from 'react';

import { Box } from '@components/core';
import { css, minMediaQuery, rhythm, styled } from '@styles/index';

import { Categories } from './Categories';
import { SearchForm } from './SearchForm';

interface ICategoryEntry {
  value: string;
  totalCount: number;
}

interface IProps {
  categories: ICategoryEntry[];
}

export const ActionBar: FC<IProps> = ({ categories }) => {
  return (
    <ActionBarWrapper>
      <SearchForm />
      <Categories categories={categories} />
    </ActionBarWrapper>
  );
};

const ActionBarWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: ${rhythm(1)};

  ${minMediaQuery.Medium(css`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    > :first-child {
      margin-right: 20px;
      flex: 0 0 auto;
    }
  `)}
`;
