import { Alert, Button, Container, Grid, List, Text, Title } from '@mantine/core';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { prismaClient } from '@egvv/shared-prisma-client';
import EventSessionCard from '../../../components/cards/event-session-card';

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
    },
  });

  return {
    props: {
      eventSession: JSON.parse(JSON.stringify(eventSession)) as typeof eventSession,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export function EventDetail({ eventSession }: InferGetStaticPropsType<typeof getStaticProps>) {
  const startDate = new Date(eventSession.startAt as unknown as string);
  const endDate = new Date(eventSession.endAt as unknown as string);

  return (
    <Container mt={40}>
      <Title order={1} mb={10}>
        <Grid justify="space-between">
          <Grid.Col span={9}>{eventSession.event.season.series.name}</Grid.Col>
          <Grid.Col span={3}>
            <Text align="right">
              <Link href={`/events/${eventSession.event.slug}`} passHref>
                <Button variant="light" color="blue" component="a" size="xs">
                  Back
                </Button>
              </Link>
            </Text>
          </Grid.Col>
        </Grid>
      </Title>
      <Title order={2} mb={10}>
        {eventSession.event.season.name}
      </Title>
      <Title order={3} mb={10}>
        {eventSession.name}
      </Title>
      <List>
        <List.Item>Type: {eventSession.type}</List.Item>
        <List.Item>
          Start at: {startDate.toLocaleDateString()} {startDate.toLocaleTimeString()}
        </List.Item>
        <List.Item>
          End at: {endDate.toLocaleDateString()} {endDate.toLocaleTimeString()}
        </List.Item>
      </List>
    </Container>
  );
}

export default EventDetail;
