import Error from 'next/error';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Badge, Container, Tabs, Title } from '@mantine/core';

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
  if (!eventSession) {
    return {
      props: {
        errorCode: 404,
      },
    };
  }

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

export default function EventSessionsDetail({
  eventSession,
  errorCode,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

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
      <Container mt={30}>
        <Title order={2} mb={20}>
          <span>{eventSession.name}</span>
          <Badge variant="filled" color="blue" ml={20}>
            <span>
              {startDate.toLocaleDateString()} {startDate.toLocaleTimeString()}
            </span>
            <span> - </span>
            <span>
              {endDate.toLocaleDateString()} {endDate.toLocaleTimeString()}
            </span>
            <span> UTC</span>
          </Badge>
        </Title>
        <Tabs>
          <Tabs.Tab label="Starting Grid">TODO: STARTING GRID</Tabs.Tab>
          <Tabs.Tab label="Classification">TODO: CLASSIFICATION</Tabs.Tab>
          <Tabs.Tab label="Pit Stops">TODO: PIT STOPS</Tabs.Tab>
          <Tabs.Tab label="Laps">TODO: LAPS</Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}
