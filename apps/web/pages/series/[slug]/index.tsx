import { Alert, Button, Container, Grid, Text, Title } from '@mantine/core';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { prismaClient } from '@egvv/shared-prisma-client';
import { SeasonCard } from '../../../components/cards/season-card';
import { Breadcrumbs } from '../../../components/layout/breadcrumbs';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug as string;

  const series = await prismaClient.series.findFirst({
    where: {
      slug,
    },
    include: {
      seasons: {
        orderBy: [
          {
            startAt: 'desc',
          },
        ],
      },
    },
  });

  return {
    props: {
      series: JSON.parse(JSON.stringify(series)) as typeof series,
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
  return (
    <>
      <Breadcrumbs links={[{ label: 'Series', href: '/series' }, { label: series.name }]} />
      <Container mt={40}>
        <Title order={1} mb={10}>
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
        </Title>
        <Title order={2} mb={10}>
          {series.description}
        </Title>
        <Grid>
          {series.seasons.length === 0 && <Alert style={{ width: '100%' }}>No seasons found for this series</Alert>}
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
                <SeasonCard season={season} />
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default SeriesDetail;
