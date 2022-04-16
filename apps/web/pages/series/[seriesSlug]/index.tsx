import { Button, Card, Container, Grid, Space, Text, Title, useMantineTheme } from '@mantine/core';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import client from '@egvv/shared-prisma-client';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const seriesSlug = context.params?.seriesSlug as string;

  const series = await client.series.findFirst({
    where: {
      slug: seriesSlug,
    },
    include: {
      seasons: true,
    },
  });

  return {
    props: {
      series,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export function SeriesDetail({ series }: InferGetStaticPropsType<typeof getStaticProps>) {
  const theme = useMantineTheme();

  return (
    <Container mt={40}>
      <h1>
        <Grid justify="space-between">
          <Grid.Col span={9}>{series.name}</Grid.Col>
          <Grid.Col span={3}>
            <Text align="right">
              <Link href={`/series`} passHref>
                <Button variant="light" color="blue" component="a" size="xs">
                  Back
                </Button>
              </Link>
            </Text>
          </Grid.Col>
        </Grid>
      </h1>
      <h2>{series.description}</h2>
      <Grid>
        {series.seasons.map((season) => {
          return (
            <Grid.Col
              key={season.id}
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
                <Title order={4}>{season.name}</Title>
                <Space h="md" />
                <Link href={`/season/${season.slug}`} passHref>
                  <Button variant="light" color="blue" component="a" fullWidth>
                    View season
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

export default SeriesDetail;
