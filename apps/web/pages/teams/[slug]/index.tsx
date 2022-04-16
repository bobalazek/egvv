import Error from 'next/error';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Container, Text, Title } from '@mantine/core';

import { prismaClient } from '@egvv/shared-prisma-client';
import { Breadcrumbs } from '../../../components/layout/breadcrumbs';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug as string;

  const team = await prismaClient.team.findFirst({
    where: {
      slug,
    },
  });
  if (!team) {
    return {
      props: {
        errorCode: 404,
      },
    };
  }

  return {
    props: {
      team: JSON.parse(JSON.stringify(team)) as typeof team,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default function TeamDetail({ team, errorCode }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
      <Breadcrumbs links={[{ label: 'Teams', href: '/teams' }, { label: team.name }]} />
      <Container mt={40}>
        <Text align="center">
          <Title order={2} mb={10}>
            {team.name}
          </Title>
        </Text>
        <div>TODO</div>
      </Container>
    </>
  );
}
