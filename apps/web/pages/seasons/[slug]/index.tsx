import Error from 'next/error';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Alert, Container, Grid, Table, Tabs } from '@mantine/core';

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
          season: true,
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

  const teamStandingsPoints = await prismaClient.seasonTeamStandingEntry.groupBy({
    by: ['seasonTeamId'],
    orderBy: [{ _sum: { points: 'desc' } }],
    _sum: {
      points: true,
    },
  });
  const teamStandingsMap = new Map(
    teamStandingsPoints.map((teamStanding) => {
      return [teamStanding.seasonTeamId, teamStanding._sum.points];
    })
  );
  const teamStandings: {
    seasonTeam: typeof season.seasonTeams[number];
    points: number;
  }[] = [];
  for (const seasonTeam of season.seasonTeams) {
    teamStandings.push({
      seasonTeam,
      points: teamStandingsMap.get(seasonTeam.id) || 0,
    });
  }
  teamStandings.sort((a, b) => {
    return b.points - a.points;
  });

  const driverStandingsPoints = await prismaClient.seasonDriverStandingEntry.groupBy({
    by: ['seasonDriverId'],
    orderBy: [{ _sum: { points: 'desc' } }],
    _sum: {
      points: true,
    },
  });
  const driverStandingsMap = new Map(
    driverStandingsPoints.map((driverStanding) => {
      return [driverStanding.seasonDriverId, driverStanding._sum.points];
    })
  );
  const driverStandings: {
    seasonDriver: typeof season.seasonTeams[number]['seasonDrivers'][number];
    points: number;
  }[] = [];
  const seasonDrivers = season.seasonTeams.flatMap((seasonTeam) => {
    return seasonTeam.seasonDrivers;
  });
  for (const seasonDriver of seasonDrivers) {
    driverStandings.push({
      seasonDriver,
      points: driverStandingsMap.get(seasonDriver.id) || 0,
    });
  }
  driverStandings.sort((a, b) => {
    return b.points - a.points;
  });

  return {
    props: {
      season: JSON.parse(JSON.stringify(season)) as typeof season,
      teamStandings: JSON.parse(JSON.stringify(teamStandings)) as typeof teamStandings,
      driverStandings: JSON.parse(JSON.stringify(driverStandings)) as typeof driverStandings,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default function SeasonsDetail({
  season,
  teamStandings,
  driverStandings,
  errorCode,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
                    <SeasonTeamCard seasonTeam={seasonTeam} hideSeason={true} hideViewSeasonButton={true} />
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
                      <SeasonDriverCard
                        hideSeason={true}
                        seasonTeam={seasonTeam}
                        seasonDriver={seasonDriver}
                        hideViewSeasonButton={true}
                      />
                    </Grid.Col>
                  );
                });
              })}
            </Grid>
          </Tabs.Tab>
          <Tabs.Tab label="Team standings">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {teamStandings.map((teamStanding) => {
                  return (
                    <tr key={teamStanding.seasonTeam.id}>
                      <td>{teamStanding.seasonTeam.name}</td>
                      <td>{teamStanding.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tabs.Tab>
          <Tabs.Tab label="Driver standings">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {driverStandings.map((driverStanding) => {
                  const fullName = `${driverStanding.seasonDriver.driver.firstName} ${driverStanding.seasonDriver.driver.lastName}`;
                  return (
                    <tr key={driverStanding.seasonDriver.id}>
                      <td>{fullName}</td>
                      <td>{driverStanding.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}
