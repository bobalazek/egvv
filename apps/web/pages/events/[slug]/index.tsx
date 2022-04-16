import { Alert, Button, Container, Grid, Text, Title } from '@mantine/core';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

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
      season: {
        include: {
          series: true,
        },
      },
      eventSessions: true,
    },
  });

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

export function EventDetail({ event }: InferGetStaticPropsType<typeof getStaticProps>) {
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
      </Container>
    </>
  );
}

export default EventDetail;
