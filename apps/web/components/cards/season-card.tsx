import { Button, Card, Space, Title, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { Season } from '@prisma/client';

export function SeasonCard({ season }: { season: Season }) {
  const theme = useMantineTheme();

  return (
    <Card
      shadow="sm"
      p="lg"
      style={{
        background: theme.colors.blue[1],
      }}
    >
      <Title order={4}>{season.name}</Title>
      <Space h="md" />
      <Link href={`/seasons/${season.slug}`} passHref>
        <Button variant="light" color="blue" component="a" fullWidth>
          View season
        </Button>
      </Link>
    </Card>
  );
}

export default SeasonCard;
