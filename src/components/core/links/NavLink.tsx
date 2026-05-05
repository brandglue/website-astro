import { ArrowRight } from 'styled-icons/bootstrap';
import cx from 'classnames';
import React, {
  AnchorHTMLAttributes,
  FC,
  useEffect,
  useState,
} from 'react';
import { color, space, typography, variant } from 'styled-system';

import { customText, StyledSystemProps, styled } from '@styles/index';

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  hasArrow?: boolean;
  to: string;
}

const WrappedLink: FC<IProps> = (props) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkActive = () => {
        const toWithSlash = props.to.endsWith('/') ? props.to : `${props.to}/`;
        // Home ("/") should only match exact root
        if (toWithSlash === '/') {
          setIsActive(window.location.pathname === '/');
        } else {
          setIsActive(window.location.pathname.startsWith(toWithSlash));
        }
      };
      checkActive();
      window.addEventListener('popstate', checkActive);
      return () => window.removeEventListener('popstate', checkActive);
    }
  }, [props.to]);

  const toWithTrailingSlash = props.to.endsWith('/')
    ? props.to
    : `${props.to}/`;

  const className = cx(props.className, { isActive });

  return (
    <a
      className={className}
      href={toWithTrailingSlash}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children} {props.hasArrow && <Arrow />}
    </a>
  );
};

WrappedLink.defaultProps = {
  className: '',
};

const Arrow = styled(ArrowRight)`
  width: 20px;
`;

export const NavLink = styled(WrappedLink)<StyledSystemProps>`
  ${({ theme }) =>
    variant({
      variants: {
        invisible: {
          'color': 'currentColor',
          'textDecoration': 'none',
          'border': 'none',

          '&:hover': {
            opacity: `1`,
          },
        },
        title: {
          'display': 'inline-block',
          'color': 'currentColor',
          'textDecoration': 'none',
          'border': 'none',

          '&:hover': {
            color: `${theme.colors.blue}`,
            opacity: `1`,
          },
        },
        button: {
          'display': 'inline-block',
          'background': `${theme.colors.darkBlue}`,
          'color': `${theme.colors.white}`,
          'textDecoration': 'none',
          'border': 'none',
          'textTransform': 'uppercase',
          'padding': '0.6em',
          'borderRadius': '5px',

          '&:hover': {
            background: `${theme.colors.blue}`,
            opacity: `1`,
          },
        },
        badge: {
          'display': 'inline-block',
          'background': `${theme.colors.lightBlue}`,
          'color': `${theme.colors.gray06}`,
          'textDecoration': 'none',
          'border': 'none',
          'padding': '0.6em',
          'borderRadius': '5px',

          '&:hover': {
            background: `${theme.colors.blue}`,
            color: `${theme.colors.white}`,
          },
        },
      },
    })}

  ${color}
  ${space}
  ${typography}
  ${customText}
`;
