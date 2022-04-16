import { Alert, Button, Container, Grid, Text, Title } from '@mantine/core';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { prismaClient } from '@egvv/shared-prisma-client';
import { EventCard } from '../../../components/cards/event-card';
import { Breadcrumbs } from '../../../components/layout/breadcrumbs';

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
  return (
    <>
      <Breadcrumbs
        links={[
          { label: 'Series', href: '/series' },
          { label: season.series.name, href: `/series/${season.series.slug}` },
          { label: season.name },
        ]}
      />
      <Container mt={40}>
        <Grid>
          {season.events.length === 0 && <Alert style={{ width: '100%' }}>No events found for this season</Alert>}
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
                <EventCard event={event} />
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default SeasonDetail;
