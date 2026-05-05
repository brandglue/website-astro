import { kebabCase } from 'lodash-es';
import React, { FC } from 'react';

import { Contact } from '@components/common';
import { Box, Divider, H1, Image, NavLink, P } from '@components/core';
import { css, minMediaQuery, rhythm, scale, styled } from '@styles/index';
import { TopLevelPages as Pages } from '@utils/routes';

interface ICaseStudy {
  client: string;
  title: string;
  description?: string;
  slug: string;
  logoSrc?: string;
}

interface IProps {
  caseStudies: ICaseStudy[];
}

export const CaseStudiesPage: FC<IProps> = ({ caseStudies }) => {
  return (
    <>
      <Divider />
      <Box pb={0} variant="section">
        <H1>See how we&apos;ve helped our clients.</H1>
        <P>
          From developing social strategies to event social management, we've
          done a lot. But don&apos;t take our word for it, check out the case
          studies below.
        </P>
      </Box>
      <Box>
        {caseStudies.map((cs, index) => {
          const isEven = index % 2 === 0;
          return (
            <CaseStudyWrapper key={cs.client}>
              <CaseStudy isEven={isEven} variant="section">
                <CaseStudyText isEven={isEven}>
                  <CaseStudyTitle>{cs.client}</CaseStudyTitle>
                  <h3>{cs.title}</h3>
                  <p>{cs.description}</p>
                  <NavLink hasArrow to={`/${Pages.CaseStudies}/${cs.slug}/`}>
                    Check out the case study
                  </NavLink>
                </CaseStudyText>
                <CaseStudyImage>
                  {cs.logoSrc && (
                    <Image alt={kebabCase(cs.client)} src={cs.logoSrc} />
                  )}
                </CaseStudyImage>
              </CaseStudy>
            </CaseStudyWrapper>
          );
        })}
      </Box>
      <Divider />
      <Contact />
    </>
  );
};

const CaseStudyWrapper = styled(Box)`
  &:nth-child(odd) {
    background: ${({ theme }) => theme.colors.gray00};
  }
`;

interface ICaseStudyProps {
  isEven: boolean;
}

const CaseStudy = styled(Box)<ICaseStudyProps>`
  display: flex;
  flex-direction: column-reverse;
  ${minMediaQuery.Small(css`
    flex-direction: ${(props: any) => (props.isEven ? 'row' : 'row-reverse')};
    align-items: center;
  `)}
`;

const CaseStudyText = styled(Box)<ICaseStudyProps>`
  ${minMediaQuery.Small(css`
    flex-basis: 70%;
    margin-right: ${(props: any) => props.isEven && '10%'};
    margin-left: ${(props: any) => !props.isEven && '10%'};
  `)}
`;

const CaseStudyTitle = styled.h2`
  font-size: ${scale(0.1).fontSize};
  color: ${({ theme }) => theme.colors.gray04};
`;

const CaseStudyImage = styled(Box)`
  max-width: fit-content;
  margin-bottom: ${rhythm(1)};
  ${minMediaQuery.Small(css`
    flex-basis: 20%;
    margin-bottom: 0;
  `)}
`;
