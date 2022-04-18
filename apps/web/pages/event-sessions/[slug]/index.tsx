import Error from 'next/error';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Container, List, ListItem, Table, Tabs, Title } from '@mantine/core';

import { prismaClient } from '@egvv/shared-prisma-client';
import { Breadcrumbs } from '../../../components/layout/breadcrumbs';
import { convertToHumanCase } from '@egvv/shared-helpers';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug as string;

  const eventSession = await prismaClient.eventSession.findFirst({
    where: {
      slug,
    },
    include: {
      event: {
        include: {
          season: {
            include: {
              series: true,
            },
          },
        },
      },
      eventSessionDrivers: true,
    },
  });
  if (!eventSession) {
    return {
      props: {
        errorCode: 404,
      },
    };
  }

  const include = {
    eventSessionDriver: {
      include: {
        seasonDriver: {
          include: {
            driver: true,
            seasonTeam: true,
          },
        },
      },
    },
  };
  const eventSessionDriverIds = eventSession.eventSessionDrivers.map((eventSessionDriver) => {
    return eventSessionDriver.id;
  });

  const eventSessionStartingGrid = await prismaClient.eventSessionDriverStartingGrid.findMany({
    where: {
      eventSessionDriverId: {
        in: eventSessionDriverIds,
      },
    },
    include,
    orderBy: [
      {
        position: 'desc',
      },
    ],
  });

  const eventSessionClassification = await prismaClient.eventSessionDriverClassification.findMany({
    where: {
      eventSessionDriverId: {
        in: eventSessionDriverIds,
      },
    },
    include,
    orderBy: [
      {
        position: 'desc',
      },
    ],
  });

  return {
    props: {
      eventSession: JSON.parse(JSON.stringify(eventSession)) as typeof eventSession,
      eventSessionStartingGrid: JSON.parse(JSON.stringify(eventSessionStartingGrid)) as typeof eventSessionStartingGrid,
      eventSessionClassification: JSON.parse(
        JSON.stringify(eventSessionClassification)
      ) as typeof eventSessionClassification,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default function EventSessionsDetail({
  eventSession,
  eventSessionStartingGrid,
  eventSessionClassification,
  errorCode,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const type = convertToHumanCase(eventSession.type);
  const startDate = new Date(eventSession.startAt as unknown as string);
  const endDate = new Date(eventSession.endAt as unknown as string);

  return (
    <>
      <Breadcrumbs
        links={[
          { label: 'Series', href: '/series' },
          { label: eventSession.event.season.series.name, href: `/series/${eventSession.event.season.series.slug}` },
          { label: eventSession.event.season.name, href: `/seasons/${eventSession.event.season.slug}` },
          { label: eventSession.event.name, href: `/events/${eventSession.event.slug}` },
          { label: type },
        ]}
      />
      <Container mt={30}>
        <Title order={2} mb={20}>
          {eventSession.name}
        </Title>
        <Tabs>
          <Tabs.Tab label="Information">
            <List>
              <ListItem>
                Name: <b>{eventSession.name}</b>
              </ListItem>
              <ListItem>
                Type: <b>{type}</b>
              </ListItem>
              <ListItem>
                Start at:{' '}
                <b>
                  {startDate.toLocaleDateString()} {startDate.toLocaleTimeString()} UTC
                </b>
              </ListItem>
              <ListItem>
                End at:{' '}
                <b>
                  {endDate.toLocaleDateString()} {endDate.toLocaleTimeString()} UTC
                </b>
              </ListItem>
            </List>
          </Tabs.Tab>
          {eventSessionStartingGrid.length > 0 && (
            <Tabs.Tab label="Starting Grid">
              <Table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Time</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {eventSessionStartingGrid.map((startingGrid) => {
                    const driverName = `${startingGrid.eventSessionDriver.seasonDriver.driver.firstName} ${startingGrid.eventSessionDriver.seasonDriver.driver.lastName}`;
                    return (
                      <tr key={startingGrid.id}>
                        <td>{startingGrid.position}</td>
                        <td>{driverName}</td>
                        <td>{startingGrid.eventSessionDriver.seasonDriver.seasonTeam.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tabs.Tab>
          )}
          {eventSessionClassification.length > 0 && (
            <Tabs.Tab label="Classification">
              <Table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Time</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {eventSessionStartingGrid.map((startingGrid) => {
                    const driverName = `${startingGrid.eventSessionDriver.seasonDriver.driver.firstName} ${startingGrid.eventSessionDriver.seasonDriver.driver.lastName}`;
                    return (
                      <tr key={startingGrid.id}>
                        <td>{startingGrid.position}</td>
                        <td>{driverName}</td>
                        <td>{startingGrid.eventSessionDriver.seasonDriver.seasonTeam.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tabs.Tab>
          )}
          <Tabs.Tab label="Pit Stops">TODO: PIT STOPS</Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}
