import { InferGetStaticPropsType } from 'next';
import { Container, Grid, Text, Title } from '@mantine/core';

import { prismaClient } from '@egvv/shared-prisma-client';
import { SeriesCard } from '../../components/cards/series-card';
import { Breadcrumbs } from '../../components/layout/breadcrumbs';

export const getStaticProps = async () => {
  const series = await prismaClient.series.findMany({
    where: {
      seasons: {
        some: {
          events: {
            some: {},
          },
        },
      },
    },
  });

  return {
    props: {
      series,
    },
  };
};

export default function Series({ series }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Breadcrumbs links={[{ label: 'Series' }]} />
      <Container mt={40}>
        <Text align="center">
          <Title order={2} mb={10}>
            Which series are you the most interested in? We have a few of them!
          </Title>
        </Text>
        <Grid>
          {series.map((single) => {
            return (
              <Grid.Col
                key={single.id}
                lg={4}
                md={6}
                style={{
                  textAlign: 'center',
                }}
              >
                <SeriesCard series={single} />
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
