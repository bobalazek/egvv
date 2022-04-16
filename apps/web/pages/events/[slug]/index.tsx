import { Alert, Button, Container, Grid, Text, Title } from '@mantine/core';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { prismaClient } from '@egvv/shared-prisma-client';
import EventSessionCard from '../../../components/cards/event-session-card';

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
    <Container mt={40}>
      <Title order={1} mb={10}>
        <Grid justify="space-between">
          <Grid.Col span={9}>{event.season.series.name}</Grid.Col>
          <Grid.Col span={3}>
            <Text align="right">
              <Link href={`/seasons/${event.season.slug}`} passHref>
                <Button variant="light" color="blue" component="a" size="xs">
                  Back
                </Button>
              </Link>
            </Text>
          </Grid.Col>
        </Grid>
      </Title>
      <Title order={2} mb={10}>
        {event.season.name}
      </Title>
      <Title order={3} mb={10}>
        {event.name}
      </Title>
      <Grid>
        {event.eventSessions.length === 0 && <Alert style={{ width: '100%' }}>No sessions found for this event</Alert>}
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
  );
}

export default EventDetail;
