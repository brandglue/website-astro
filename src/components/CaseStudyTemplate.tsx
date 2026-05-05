import { FilePdf } from 'styled-icons/boxicons-solid';
import React, { FC, ReactNode } from 'react';

import { Breadcrumbs, ICrumb } from '@components/common/Breadcrumbs';
import { Anchor, Box, Divider, Image, H1 } from '@components/core';
import { css, hexToRgb, rhythm, styled } from '@styles/index';

interface ICaseStudy {
  client: string;
  title: string;
  slug: string;
  logoSrc?: string;
  attachment?: string;
}

interface IProps {
  caseStudy: ICaseStudy;
  children?: ReactNode;
  crumbs: ICrumb[];
}

export const CaseStudyTemplate: FC<IProps> = ({ caseStudy, children, crumbs }) => {
  const download = caseStudy.attachment;

  return (
    <>
      <Divider />
      <Box pb={0} variant="section">
        <Breadcrumbs crumbs={crumbs} />
      </Box>
      <Box bg="gray00">
        <HeaderWrapper>
          <Header>
            <Logo variant="flexItem">
              {caseStudy.logoSrc && (
                <Image alt={caseStudy.client} src={caseStudy.logoSrc} />
              )}
            </Logo>
            <HeaderContent variant="flexItem">
              <H1>{caseStudy.title}</H1>
              {download && (
                <Download
                  download={`brandglue-${caseStudy.client}-case-study`.toLowerCase()}
                  hasArrow={false}
                  href={download}
                >
                  Download the Case Study
                  <StyledFilePdf />
                </Download>
              )}
            </HeaderContent>
          </Header>
        </HeaderWrapper>
      </Box>
      <Box variant="section">{children}</Box>
    </>
  );
};

const HeaderWrapper = styled(Box)`
  max-width: ${({ theme }) => theme.spacings.maxContentColWidth};
  padding: ${rhythm(1)};
  margin: 0 auto;
`;

const Header = styled(Box)`
  display: flex;
  flex-flow: column;
`;

const Logo = styled(Box)`
  max-width: 200px;
  margin-bottom: ${rhythm(0.5)};
`;

const HeaderContent = styled(Box)`
  flex-basis: 85%;
`;

const Download = styled(Anchor)`
  ${({ theme }) => css`
    display: inline-block;
    background: ${theme.colors.blue};
    color: ${theme.colors.white};
    padding: 0.6em;
    text-decoration: none;

    &:focus,
    &:active,
    &:hover {
      background: rgba(${hexToRgb(theme.colors.blue)}, 0.9);
    }
  `}
`;

const StyledFilePdf = styled(FilePdf)`
  color: ${({ theme }) => theme.colors.white};
  width: 24px;
  margin-left: 0.2em;
`;
