import { Container, Grid } from '@mantine/core';
import { InferGetStaticPropsType } from 'next';

import { prismaClient } from '@egvv/shared-prisma-client';
import SeriesCard from '../../components/cards/series-card';

export const getStaticProps = async () => {
  const series = await prismaClient.series.findMany();

  return {
    props: {
      series,
    },
  };
};

export function Series({ series }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container mt={40}>
      <h1>Series</h1>
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
  );
}

export default Series;
