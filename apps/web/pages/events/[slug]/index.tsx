import Error from 'next/error';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Alert, Container, Grid } from '@mantine/core';

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
