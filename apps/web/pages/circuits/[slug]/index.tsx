import Error from 'next/error';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Container, List, ListItem, Tabs, Text, Title } from '@mantine/core';
import countryCodeLookup from 'country-code-lookup';

import { prismaClient } from '@egvv/shared-prisma-client';
import { Breadcrumbs } from '../../../components/layout/breadcrumbs';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug as string;

  const circuit = await prismaClient.circuit.findFirst({
    where: {
      slug,
    },
  });
  if (!circuit) {
    return {
      props: {
        errorCode: 404,
      },
    };
  }

  return {
    props: {
      circuit: JSON.parse(JSON.stringify(circuit)) as typeof circuit,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default function CircuitsDetail({ circuit, errorCode }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
      <Breadcrumbs links={[{ label: 'Circuits', href: '/circuits' }, { label: circuit.name }]} />
      <Container mt={40}>
        <Text align="center">
          <Title order={2} mb={10}>
            {circuit.name}
          </Title>
        </Text>
        <Tabs>
          <Tabs.Tab label="Information">
            <List>
              <ListItem>
                Name: <b>{circuit.name}</b>
              </ListItem>
              <ListItem>
                Location: <b>{circuit.location}</b>
              </ListItem>
              <ListItem>
                Country: <b>{countryCodeLookup.byIso(circuit.countryCode).country}</b>
              </ListItem>
              <ListItem>
                Timezone: <b>{circuit.timezone}</b>
              </ListItem>
              <ListItem>
                Url:{' '}
                <a href={circuit.url} target="_blank" rel="noreferrer">
                  {circuit.url}
                </a>
              </ListItem>
            </List>
          </Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}
