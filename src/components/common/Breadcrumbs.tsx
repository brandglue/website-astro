import React, { FC } from 'react';

import { NavLink } from '@components/core';
import { scale, styled } from '@styles/index';

export interface ICrumb {
  label: string;
  href: string;
}

interface IProps {
  crumbs: ICrumb[];
}

export const Breadcrumbs: FC<IProps> = ({ crumbs }) => {
  return (
    <nav className="breadcrumb">
      <ol className="breadcrumb__list">
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="breadcrumb__list__item">
            <BreadcrumbLink to={crumb.href} aria-current={i === crumbs.length - 1 ? 'page' : undefined}>
              {crumb.label}
            </BreadcrumbLink>
            {i < crumbs.length - 1 && <Sep aria-hidden="true"> / </Sep>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

const BreadcrumbLink = styled(NavLink)`
  font-size: ${scale(-0.25).fontSize};
`;

const Sep = styled.span`
  font-size: ${scale(-0.25).fontSize};
  padding: 0 0.25em;
  color: inherit;
  opacity: 0.6;
`;

