import { Button, Card, Container, Grid, Space, Text, Title, useMantineTheme } from '@mantine/core';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { prismaClient } from '@egvv/shared-prisma-client';

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
    },
  });

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

export function SeasonDetail({ season }: InferGetStaticPropsType<typeof getStaticProps>) {
  const theme = useMantineTheme();

  return (
    <Container mt={40}>
      <Title order={1}>
        <Grid justify="space-between">
          <Grid.Col span={9}>{season.name}</Grid.Col>
          <Grid.Col span={3}>
            <Text align="right">
              <Link href={`/series/${season.series.slug}`} passHref>
                <Button variant="light" color="blue" component="a" size="xs">
                  Back
                </Button>
              </Link>
            </Text>
          </Grid.Col>
        </Grid>
      </Title>
      <Grid>
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
              <Card
                shadow="sm"
                p="lg"
                style={{
                  background: theme.colors.blue[1],
                }}
              >
                <Title order={4}>{event.name}</Title>
                <Title order={5}>{new Date(event.raceAt as unknown as string).toLocaleDateString()}</Title>
                <Space h="md" />
                <Link href={`/events/${event.slug}`} passHref>
                  <Button variant="light" color="blue" component="a" fullWidth>
                    View event
                  </Button>
                </Link>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
}

export default SeasonDetail;
