import Error from 'next/error';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Container, Text, Title } from '@mantine/core';

import { prismaClient } from '@egvv/shared-prisma-client';
import { Breadcrumbs } from '../../../components/layout/breadcrumbs';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug as string;

  const driver = await prismaClient.driver.findFirst({
    where: {
      slug,
    },
  });
  if (!driver) {
    return {
      props: {
        errorCode: 404,
      },
    };
  }

  return {
    props: {
      driver: JSON.parse(JSON.stringify(driver)) as typeof driver,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default function DriverDetail({ driver, errorCode }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const fullName = `${driver.firstName} ${driver.lastName}`;

  return (
    <>
      <Breadcrumbs links={[{ label: 'Drivers', href: '/drivers' }, { label: fullName }]} />
      <Container mt={40}>
        <Text align="center">
          <Title order={2} mb={10}>
            {fullName}
          </Title>
        </Text>
        <div>TODO</div>
      </Container>
    </>
  );
}
