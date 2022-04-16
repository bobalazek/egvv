import { Alert, Container, Grid, Tabs } from '@mantine/core';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Error from 'next/error';

import { prismaClient } from '@egvv/shared-prisma-client';
import { EventCard } from '../../../components/cards/event-card';
import { Breadcrumbs } from '../../../components/layout/breadcrumbs';
import { SeasonTeamCard } from '../../../components/cards/season-team-card';
import { SeasonDriverCard } from '../../../components/cards/season-driver-card';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug as string;

  const season = await prismaClient.season.findFirst({
    where: {
      slug,
    },
    orderBy: [{ startAt: 'asc' }],
    include: {
      series: true,
      events: true,
      seasonTeams: {
        include: {
          team: true,
          seasonDrivers: {
            include: {
              driver: true,
            },
          },
        },
      },
    },
  });
  if (!season) {
    return {
      props: {
        errorCode: 404,
      },
    };
  }

  return {
    props: {
      season: JSON.parse(JSON.stringify(season)) as typeof season,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export function SeasonDetail({ season, errorCode }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
      <Breadcrumbs
        links={[
          { label: 'Series', href: '/series' },
          { label: season.series.name, href: `/series/${season.series.slug}` },
          { label: season.name },
        ]}
      />
      <Container mt={20}>
        <Tabs>
          <Tabs.Tab label="Events">
            <Grid>
              {season.events.length === 0 && <Alert style={{ width: '100%' }}>No events found for this season</Alert>}
              {season.events.map((event) => {
                return (
                  <Grid.Col
                    key={event.id}
                    lg={4}
                    md={6}
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <EventCard event={event} />
                  </Grid.Col>
                );
              })}
            </Grid>
          </Tabs.Tab>
          <Tabs.Tab label="Teams">
            <Grid>
              {season.seasonTeams.length === 0 && (
                <Alert style={{ width: '100%' }}>No teams found for this season</Alert>
              )}
              {season.seasonTeams.map((seasonTeam) => {
                return (
                  <Grid.Col
                    key={seasonTeam.id}
                    lg={4}
                    md={6}
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <SeasonTeamCard seasonTeam={seasonTeam} />
                  </Grid.Col>
                );
              })}
            </Grid>
          </Tabs.Tab>
          <Tabs.Tab label="Drivers">
            <Grid>
              {season.seasonTeams.length === 0 && (
                <Alert style={{ width: '100%' }}>No drivers found for this season</Alert>
              )}
              {season.seasonTeams.map((seasonTeam) => {
                return seasonTeam.seasonDrivers.map((seasonDriver) => {
                  return (
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
              })}
            </Grid>
          </Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default SeasonDetail;
