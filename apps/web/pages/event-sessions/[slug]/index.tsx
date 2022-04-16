import { Button, Container, Grid, List, Text, Title } from '@mantine/core';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { prismaClient } from '@egvv/shared-prisma-client';
import { Breadcrumbs } from '../../../components/layout/breadcrumbs';
import { convertToHumanCase } from '@egvv/shared-helpers';

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
    <>
      <Breadcrumbs
        links={[
          { label: 'Series', href: '/series' },
          { label: eventSession.event.season.series.name, href: `/series/${eventSession.event.season.series.slug}` },
          { label: eventSession.event.season.name, href: `/seasons/${eventSession.event.season.slug}` },
          { label: eventSession.event.name, href: `/events/${eventSession.event.slug}` },
          { label: convertToHumanCase(eventSession.type) },
        ]}
      />
      <Container mt={40}>
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
    </>
  );
}

export default EventDetail;
