import { Button, Card, Title, useMantineTheme } from '@mantine/core';
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
      <Title order={4} mb={10}>
        {season.name}
      </Title>
      <Link href={`/seasons/${season.slug}`} passHref>
        <Button variant="light" color="blue" component="a" fullWidth>
          View season
        </Button>
      </Link>
    </Card>
  );
}

export default SeasonCard;
