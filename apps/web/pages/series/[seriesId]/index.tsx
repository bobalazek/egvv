import { Container } from '@mantine/core';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { gql } from '@apollo/client';

import client from '@egvv/shared-apollo-client';
import { SeriesInterface } from '../../../interfaces/series';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const seriesId = context.params?.seriesId as string;

  const response = await client.query({
    query: gql`
      query getSeries($seriesId: String!) {
        Series(id: $seriesId) {
          id
          slug
          name
          description
          url
          seasons {
            id
            slug
            name
            year
            startAt
            endAt
          }
        }
      }
    `,
    variables: {
      seriesId,
    },
  });

  const series: SeriesInterface = response.data.series;

  return {
    props: {
      series,
    },
  };
};

export function Series({ series }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container mt={40}>
      <h1>{series.name}</h1>
    </Container>
  );
}

export default Series;
