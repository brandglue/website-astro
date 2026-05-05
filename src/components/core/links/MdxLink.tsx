import React, { FC } from 'react';
import { BoxArrowUpRight } from 'styled-icons/bootstrap';

const domainRegex = /http[s]*:\/\/[www.]*brandglue\.com[/]?/;

/**
 * Replaces <a> tags in MDX-rendered content.
 * External links get an arrow icon + target="_blank".
 * Internal links render as plain <a> tags (no NavLink/ThemeProvider needed).
 */
export const MdxLink: FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href = '',
  children,
  ...rest
}) => {
  const sameDomain = domainRegex.test(href);
  if (sameDomain) {
    href = href.replace(domainRegex, '/');
  }

  const isExternal = href.startsWith('http') && !sameDomain;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer nofollow" {...rest}>
        {children}{' '}
        <BoxArrowUpRight style={{ width: 14, verticalAlign: 'baseline' }} />
      </a>
    );
  }

  return <a href={href} {...rest}>{children}</a>;
};
