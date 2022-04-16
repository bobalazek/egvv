import { Button, Card, Group, Text, Title, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { Series } from '@prisma/client';

export function SeriesCard({ series }: { series: Series }) {
  const theme = useMantineTheme();

  return (
    <Card
      shadow="sm"
      p="lg"
      style={{
        background: theme.colors.blue[1],
      }}
    >
      <Title order={3}>{series.name}</Title>
      <Text size="lg">{series.description}</Text>
      <Group
        style={{
          padding: theme.spacing.sm,
        }}
      ></Group>
      <Link href={`/series/${series.slug}`} passHref>
        <Button variant="light" color="blue" component="a" fullWidth>
          View seasons
        </Button>
      </Link>
    </Card>
  );
}
