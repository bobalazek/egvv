import Error from 'next/error';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Container, Divider, Grid, List, ListItem, Tabs, Text, Title } from '@mantine/core';

import { prismaClient } from '@egvv/shared-prisma-client';
import { Breadcrumbs } from '../../../components/layout/breadcrumbs';
import { SeasonTeamCard } from '../../../components/cards/season-team-card';
import { SeasonDriverCard } from '../../../components/cards/season-driver-card';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug as string;

  const team = await prismaClient.team.findFirst({
    where: {
      slug,
    },
    include: {
      seasonTeams: {
        include: {
          season: true,
          team: true,
          seasonDrivers: {
            include: {
              driver: true,
            },
          },
        },
        orderBy: [
          {
            season: {
              startAt: 'desc',
            },
          },
        ],
      },
    },
  });
  if (!team) {
    return {
      props: {
        errorCode: 404,
      },
    };
  }

  return {
    props: {
      team: JSON.parse(JSON.stringify(team)) as typeof team,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default function TeamDetail({ team, errorCode }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
      <Breadcrumbs links={[{ label: 'Teams', href: '/teams' }, { label: team.name }]} />
      <Container mt={40}>
        <Text align="center">
          <Title order={2} mb={10}>
            {team.name}
          </Title>
        </Text>
        <Tabs>
          <Tabs.Tab label="Information">
            <List>
              <ListItem>
                Name: <b>{team.name}</b>
              </ListItem>
            </List>
          </Tabs.Tab>
          <Tabs.Tab label="Seasons">
            <Grid>
              {team.seasonTeams.map((seasonTeam) => {
                return (
                  <Grid.Col
                    key={seasonTeam.id}
                    lg={4}
                    md={6}
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <SeasonTeamCard seasonTeam={seasonTeam} hideButton={true} />
                  </Grid.Col>
                );
              })}
            </Grid>
          </Tabs.Tab>
          <Tabs.Tab label="Drivers">
            {team.seasonTeams.map((seasonTeam, index) => {
              const drivers = [];
              seasonTeam.seasonDrivers.map((seasonDriver) => {
                drivers.push(
                  <Grid.Col
                    key={seasonDriver.id}
                    lg={4}
                    md={6}
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <SeasonDriverCard seasonTeam={seasonTeam} seasonDriver={seasonDriver} />
                  </Grid.Col>
                );
              });

              return (
                <div key={index}>
                  <Grid>{drivers}</Grid>
                  <Divider variant="dashed" my="md" />
                </div>
              );
            })}
          </Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}
