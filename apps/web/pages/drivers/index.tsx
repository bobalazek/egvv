import { InferGetStaticPropsType } from 'next';
import { Container, Grid, Text, Title } from '@mantine/core';

import { prismaClient } from '@egvv/shared-prisma-client';
import { DriverCard } from '../../components/cards/driver-card';
import { Breadcrumbs } from '../../components/layout/breadcrumbs';

export const getStaticProps = async () => {
  const drivers = await prismaClient.driver.findMany();

  return {
    props: {
      drivers: JSON.parse(JSON.stringify(drivers)) as typeof drivers,
    },
  };
};

export default function Drivers({ drivers }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Breadcrumbs links={[{ label: 'Drivers' }]} />
      <Container mt={40}>
        <Text align="center">
          <Title order={2} mb={10}>
            Here is a selection of all the drivers.
          </Title>
        </Text>
        <Grid>
          {drivers.map((driver) => {
            return (
              <Grid.Col
                key={driver.id}
                lg={4}
                md={6}
                style={{
                  textAlign: 'center',
                }}
              >
                <DriverCard driver={driver} />
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
