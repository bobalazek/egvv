import Error from 'next/error';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Alert, Container, Grid, List, ListItem, Tabs } from '@mantine/core';
import countryCodeLookup from 'country-code-lookup';

import { prismaClient } from '@egvv/shared-prisma-client';
import { EventSessionCard } from '../../../components/cards/event-session-card';
import { Breadcrumbs } from '../../../components/layout/breadcrumbs';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug as string;

  const event = await prismaClient.event.findFirst({
    where: {
      slug,
    },
    include: {
      circuit: true,
      season: {
        include: {
          series: true,
        },
      },
      eventSessions: true,
    },
  });
  if (!event) {
    return {
      props: {
        errorCode: 404,
      },
    };
  }

  return {
    props: {
      event: JSON.parse(JSON.stringify(event)) as typeof event,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default function EventsDetail({ event, errorCode }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const raceDate = new Date(event.raceAt as unknown as string);

  return (
    <>
      <Breadcrumbs
        links={[
          { label: 'Series', href: '/series' },
          { label: event.season.series.name, href: `/series/${event.season.series.slug}` },
          { label: event.season.name, href: `/seasons/${event.season.slug}` },
          { label: event.name },
        ]}
      />
      <Container mt={40}>
        <Tabs>
          <Tabs.Tab label="Information">
            <List>
              <ListItem>
                Name: <b>{event.name}</b>
              </ListItem>
              <ListItem>
                Full name: <b>{event.fullName}</b>
              </ListItem>
              <ListItem>
                Round: <b>{event.round}</b>
              </ListItem>
              <ListItem>
                Laps: <b>{event.laps}</b>
              </ListItem>
              <ListItem>
                Lap distance: <b>{event.lapDistance}</b>
              </ListItem>
              <ListItem>
                Race at:{' '}
                <b>
                  {raceDate.toLocaleDateString()} {raceDate.toLocaleTimeString()} UTC
                </b>
              </ListItem>
              <ListItem>
                Url:{' '}
                <a href={event.url} target="_blank" rel="noreferrer">
                  {event.url}
                </a>
              </ListItem>
            </List>
          </Tabs.Tab>
          <Tabs.Tab label="Circuit">
            <List>
              <ListItem>
                Name: <b>{event.circuit.name}</b>
              </ListItem>
              {event.circuitLayout && (
                <ListItem>
                  Layout: <b>{event.circuitLayout}</b>
                </ListItem>
              )}
              <ListItem>
                Timezone: <b>{event.circuit.timezone}</b>
              </ListItem>
              <ListItem>
                Location: <b>{event.circuit.location}</b>
              </ListItem>
              <ListItem>
                Country: <b>{countryCodeLookup.byIso(event.circuit.countryCode).country}</b>
              </ListItem>
              <ListItem>
                Url:{' '}
                <a href={event.circuit.url} target="_blank" rel="noreferrer">
                  {event.circuit.url}
                </a>
              </ListItem>
            </List>
          </Tabs.Tab>
          <Tabs.Tab label="Sessions">
            <Grid>
              {event.eventSessions.length === 0 && (
                <Alert style={{ width: '100%' }}>No sessions found for this event</Alert>
              )}
              {event.eventSessions.map((eventSession) => {
                return (
                  <Grid.Col
                    key={eventSession.id}
                    lg={4}
                    md={6}
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <EventSessionCard eventSession={eventSession} />
                  </Grid.Col>
                );
              })}
            </Grid>
          </Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}
