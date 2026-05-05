import { Linkedin } from 'styled-icons/boxicons-logos';
import React, { FC, useContext } from 'react';

import { Anchor, Box, Divider, Image, NavLink, P } from '@components/core';
import { AboutBrandGlueDesktop, AboutBrandGlueMobile, X } from '@media/svg';
import { AppState } from '@src/AppState';
import {
  hexToRgb,
  minMediaQuery,
  rhythm,
  scale,
  styled,
  css,
} from '@styles/index';
import { TopLevelPages as Pages } from '@utils/routes';

interface ITeamMember {
  name: string;
  title: string;
  imageSrc?: string;
  twitter?: string | null;
  linkedin?: string | null;
  loves?: string;
  goals?: string;
}

interface IJob {
  title: string;
  link?: string;
}

interface IProps {
  team: ITeamMember[];
  jobs: IJob[];
}

export const AboutPage: FC<IProps> = ({ team, jobs }) => {
  const { isLargeDevice } = useContext(AppState);

  return (
    <>
      <Divider />
      <Box variant="section">
        <h1>We&apos;ve come a long way.</h1>
        <p>
          And it feels like just yesterday that we got started. Here&apos;s a
          bit of our history.
        </p>
        <BrandGlueStory>
          {isLargeDevice ? <AboutBrandGlueDesktop /> : <AboutBrandGlueMobile />}
        </BrandGlueStory>
      </Box>
      <Team>
        <Box variant="section">
          <h2>So, who makes the team?</h2>
          <TeamGrid>
            {team.map((member) => (
              <div key={member.name}>
                {member.imageSrc && (
                  <Image alt={member.name} src={member.imageSrc} />
                )}
                <Meta>
                  <NameWrapper>
                    <Name>{member.name}</Name>
                    <Title>{member.title}</Title>
                  </NameWrapper>
                  {(member.twitter || member.linkedin) && (
                    <Social>
                      {member.twitter && (
                        <SocialAnchor
                          hasArrow={false}
                          href={member.twitter}
                          rel="noopener noreferrer nofollow"
                          target="_blank"
                          variant="invisible"
                        >
                          <X className="x-logo" fill="black" />
                        </SocialAnchor>
                      )}
                      {member.linkedin && (
                        <SocialAnchor
                          hasArrow={false}
                          href={member.linkedin}
                          rel="noopener noreferrer nofollow"
                          target="_blank"
                          variant="invisible"
                        >
                          <Linkedin />
                        </SocialAnchor>
                      )}
                    </Social>
                  )}
                </Meta>
                <Bio>
                  <LovesLabel>Loves</LovesLabel>
                  <Box>{member.loves}</Box>
                  <GoalsLabel>Goals</GoalsLabel>
                  <Box>{member.goals}</Box>
                </Bio>
              </div>
            ))}
          </TeamGrid>
        </Box>
      </Team>
      <Divider />
      <Box variant="section">
        <h2>Join the team. It&apos;s a good one.</h2>
        <p>
          With remote working and the ﬂexibility to build your day the way you
          work best, BrandGlue is a great place to focus on your talent and love
          for delivering quality experiences to our clients. Check out the
          available positions below and reach out if you&apos;re interested!
          We&apos;d love to meet you.
        </p>
        {jobs.length > 0 ? (
          <>
            <P fontStyle="italic">Current openings:</P>
            <JobsGrid>
              {jobs.map((job) => (
                <Job key={job.title}>
                  <h4>{job.title}</h4>
                  {job.link && (
                    <NavLink to={`/${Pages.Blog}/${job.link}`}>
                      Learn more
                    </NavLink>
                  )}
                </Job>
              ))}
            </JobsGrid>
          </>
        ) : (
          <P fontStyle="italic" mt="6" textAlign="center">
            No current openings. Check back soon!
          </P>
        )}
      </Box>
    </>
  );
};

const BrandGlueStory = styled.div`
  padding-top: ${rhythm(1)};
  svg {
    width: 100%;
  }
`;

const Team = styled.div`
  background: ${({ theme }) => theme.colors.gray00};
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(250px, 380px);
  grid-gap: 60px;
  margin-bottom: ${rhythm(1)};
  ${minMediaQuery.Small(css`
    grid-template-columns: 1fr 1fr;
  `)}
  ${minMediaQuery.Medium(css`
    grid-template-columns: repeat(2, minmax(250px, 380px));
  `)}
  ${minMediaQuery.Large(css`
    grid-template-columns: repeat(3, minmax(250px, 380px));
  `)}
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${minMediaQuery.Medium(css`
    flex-direction: row;
    margin-right: auto;
  `)}
`;

const NameWrapper = styled.div`
  ${minMediaQuery.Medium(css`
    margin-right: auto;
  `)}
`;

const Name = styled.div`
  margin-top: 0.5em;
  font-size: ${scale(0.25).fontSize};
  line-height: ${scale(0.25).lineHeight};
`;

const Title = styled.div`
  font-size: ${scale(-0.25).fontSize};
  line-height: ${scale(-0.25).lineHeight};
  ${minMediaQuery.Medium(css`
    margin-bottom: 1em;
  `)}
`;

const Social = styled.div`
  margin-bottom: 1em;
  ${minMediaQuery.Medium(css`
    margin-top: 0.5em;
    margin-bottom: 0;
  `)}
`;

const SocialAnchor = styled(Anchor)`
  svg {
    width: 20px;
    &.x-logo {
      width: 15px;
      vertical-align: middle;
    }
  }
`;

const Bio = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.lightBlue};
    padding: 1em;
  `}
`;

const LovesLabel = styled.div`
  color: ${({ theme }) => theme.colors.blue};
  text-transform: uppercase;
`;

const GoalsLabel = styled.div`
  color: ${({ theme }) => theme.colors.blue};
  text-transform: uppercase;
  margin-top: 1em;
`;

const Job = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.gray02};
    border-radius: 5px;
    padding: 2em;
    &:hover {
      cursor: pointer;
      border: 1px solid ${theme.colors.blue};
      box-shadow: 0 0 1px 1px rgba(${hexToRgb(theme.colors.blue)}, 0.3),
        0 0 15px 0 rgba(${hexToRgb(theme.colors.gray03)}, 0.2);
      transform: scale(1.025);
      transition: border 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
        transform 0.3s ease-in-out;
      z-index: 1;
    }
  `}
`;

const JobsGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
`;
