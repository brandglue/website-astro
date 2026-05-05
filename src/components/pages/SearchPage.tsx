import React, { FC, useEffect, useState } from 'react';

import { SearchForm } from '@components/blog';
import { Breadcrumbs, ICrumb } from '@components/common/Breadcrumbs';
import { Box, Divider, NavLink } from '@components/core';
import { getSearchResults } from '@utils/getSearchResults';
import { rhythm, styled } from '@styles/index';
import { TopLevelPages as Pages } from '@utils/routes';

interface IResult {
  title: string;
  url: string;
}

interface IProps {
  crumbs: ICrumb[];
}

export const SearchPage: FC<IProps> = ({ crumbs }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IResult[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search.slice(1));
      const q = params.get('q') || '';
      setQuery(q);

      if (q) {
        getSearchResults(q).then(setResults);
      }
    }
  }, []);

  return (
    <Box>
      <Divider />
      <Box variant="section">
        <Breadcrumbs crumbs={crumbs} />
        <SearchForm initialQuery={query} />
        <Results>
          {query && <h4>Search results:</h4>}
          {results.length > 0 ? (
            <div>
              {results.map((page, i) => (
                <Result key={i}>
                  <NavLink to={`/${Pages.Blog}/${page.url}/`}>{page.title}</NavLink>
                </Result>
              ))}
            </div>
          ) : query.length >= 3 ? (
            <div>{`No results for '${query}'.`}</div>
          ) : query.length > 0 ? (
            <div>{`No results for '${query}'. Try using at least 3 characters.`}</div>
          ) : null}
        </Results>
      </Box>
    </Box>
  );
};

const Results = styled(Box)`
  margin-top: ${rhythm(2)};
`;

const Result = styled(Box)`
  margin-bottom: 1em;
`;
