import { InferGetStaticPropsType } from 'next';
import { Container, Grid, Text, Title } from '@mantine/core';

import { prismaClient } from '@egvv/shared-prisma-client';
import { CircuitCard } from '../../components/cards/circuit-card';
import { Breadcrumbs } from '../../components/layout/breadcrumbs';

export const getStaticProps = async () => {
  const circuits = await prismaClient.circuit.findMany();

  return {
    props: {
      circuits: JSON.parse(JSON.stringify(circuits)) as typeof circuits,
    },
  };
};

export default function Circuits({ circuits }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Breadcrumbs links={[{ label: 'Circuits' }]} />
      <Container mt={40}>
        <Text align="center">
          <Title order={2} mb={10}>
            Here is a selection of all the circuits.
          </Title>
        </Text>
        <Grid>
          {circuits.map((circuit) => {
            return (
              <Grid.Col
                key={circuit.id}
                lg={4}
                md={6}
                style={{
                  textAlign: 'center',
                }}
              >
                <CircuitCard circuit={circuit} />
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
