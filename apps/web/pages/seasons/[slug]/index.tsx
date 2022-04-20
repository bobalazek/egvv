import Error from 'next/error';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Alert, Container, Grid, Tabs } from '@mantine/core';

import { prismaClient } from '@egvv/shared-prisma-client';
import { TeamStandingInterface } from '../../../interfaces/team-standing-interface';
import { DriverStandingInterface } from '../../../interfaces/driver-standing-interface';
import { Breadcrumbs } from '../../../components/layout/breadcrumbs';
import { SeasonTeamCard } from '../../../components/cards/season-team-card';
import { SeasonDriverCard } from '../../../components/cards/season-driver-card';
import { EventsTable } from '../../../components/tables/events-table';
import { TeamStandingsTable } from '../../../components/tables/team-standings-table';
import { DriverStandingsTable } from '../../../components/tables/driver-standings-table';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug as string;

  const season = await prismaClient.season.findFirst({
    where: {
      slug,
    },
    orderBy: [{ startAt: 'asc' }],
    include: {
      series: true,
      events: {
        include: {
          circuit: true,
        },
      },
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
  const teamStandings: TeamStandingInterface[] = season.seasonTeams
    .map((seasonTeam) => {
      return {
        seasonTeam,
        points: teamStandingsMap.get(seasonTeam.id) || 0,
      };
    })
    .sort((a, b) => {
      return b.points - a.points;
    })
    .map((seasonTeam, index) => {
      return {
        ...seasonTeam,
        position: index + 1,
      };
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
  const driverStandings: DriverStandingInterface[] = season.seasonTeams
    .flatMap((seasonTeam) => {
      return seasonTeam.seasonDrivers;
    })
    .map((seasonDriver) => {
      return {
        seasonDriver,
        points: driverStandingsMap.get(seasonDriver.id) || 0,
      };
    })
    .sort((a, b) => {
      return b.points - a.points;
    })
    .map((seasonDriver, index) => {
      return {
        ...seasonDriver,
        position: index + 1,
      };
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
            {season.events.length === 0 && <Alert style={{ width: '100%' }}>No events found for this season</Alert>}
            {season.events.length > 0 && <EventsTable events={season.events} />}
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
            <TeamStandingsTable teamStandings={teamStandings} />
          </Tabs.Tab>
          <Tabs.Tab label="Driver standings">
            <DriverStandingsTable driverStandings={driverStandings} />
          </Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}
