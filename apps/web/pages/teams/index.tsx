import { InferGetStaticPropsType } from 'next';
import { Container, Grid, Text, Title } from '@mantine/core';

import { prismaClient } from '@egvv/shared-prisma-client';
import { TeamCard } from '../../components/cards/team-card';
import { Breadcrumbs } from '../../components/layout/breadcrumbs';

export const getStaticProps = async () => {
  const teams = await prismaClient.team.findMany();

  return {
    props: {
      teams: JSON.parse(JSON.stringify(teams)) as typeof teams,
    },
  };
};

export default function Teams({ teams }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Breadcrumbs links={[{ label: 'Teams' }]} />
      <Container mt={40}>
        <Text align="center">
          <Title order={2} mb={10}>
            Here is a selection of all the teams.
          </Title>
        </Text>
        <Grid>
          {teams.map((team) => {
            return (
              <Grid.Col
                key={team.id}
                lg={4}
                md={6}
                style={{
                  textAlign: 'center',
                }}
              >
                <TeamCard team={team} />
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
