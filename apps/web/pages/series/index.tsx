import { Button, Card, Container, Grid, Group, Text, Title, useMantineTheme } from '@mantine/core';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { prismaClient } from '@egvv/shared-prisma-client';

export const getStaticProps = async () => {
  const series = await prismaClient.series.findMany();

  return {
    props: {
      series,
    },
  };
};

export function Series({ series }: InferGetStaticPropsType<typeof getStaticProps>) {
  const theme = useMantineTheme();

  return (
    <Container mt={40}>
      <h1>Series</h1>
      <Grid>
        {series.map((single) => {
          return (
            <Grid.Col
              key={single.id}
              lg={4}
              md={6}
              style={{
                textAlign: 'center',
              }}
            >
              <Card
                shadow="sm"
                p="lg"
                style={{
                  background: theme.colors.blue[1],
                }}
              >
                <Title order={3}>{single.name}</Title>
                <Text size="lg">{single.description}</Text>
                <Group
                  style={{
                    padding: theme.spacing.sm,
                  }}
                ></Group>
                <Link href={`/series/${single.slug}`} passHref>
                  <Button variant="light" color="blue" component="a" fullWidth>
                    View seasons
                  </Button>
                </Link>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Series;
