import Error from 'next/error';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Container, Grid, List, ListItem, Tabs, Text, Title } from '@mantine/core';
import countryCodeLookup from 'country-code-lookup';

import { prismaClient } from '@egvv/shared-prisma-client';
import { Breadcrumbs } from '../../../components/layout/breadcrumbs';
import { SeasonTeamCard } from '../../../components/cards/season-team-card';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug as string;

  const driver = await prismaClient.driver.findFirst({
    where: {
      slug,
    },
    include: {
      seasonDrivers: {
        include: {
          seasonTeam: {
            include: { season: true, team: true },
          },
          driver: true,
        },
        orderBy: [
          {
            seasonTeam: {
              season: {
                startAt: 'desc',
              },
            },
          },
        ],
      },
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

export default function DriversDetail({ driver, errorCode }: InferGetStaticPropsType<typeof getStaticProps>) {
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
        <Tabs>
          <Tabs.Tab label="Information">
            <List>
              <ListItem>
                First name: <b>{driver.firstName}</b>
              </ListItem>
              <ListItem>
                Last name: <b>{driver.lastName}</b>
              </ListItem>
              <ListItem>
                Country: <b>{countryCodeLookup.byIso(driver.countryCode).country}</b>
              </ListItem>
              <ListItem>
                Url:{' '}
                <a href={driver.url} target="_blank" rel="noreferrer">
                  {driver.url}
                </a>
              </ListItem>
            </List>
          </Tabs.Tab>
          <Tabs.Tab label="Teams">
            <Grid>
              {driver.seasonDrivers.map((seasonDriver) => {
                return (
                  <Grid.Col
                    key={seasonDriver.id}
                    lg={4}
                    md={6}
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <SeasonTeamCard seasonTeam={seasonDriver.seasonTeam} />
                  </Grid.Col>
                );
              })}
            </Grid>
          </Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}
