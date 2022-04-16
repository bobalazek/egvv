import Link from 'next/link';
import { Button, Card, Title, useMantineTheme } from '@mantine/core';
import { Team } from '@prisma/client';

export function TeamCard({ team }: { team: Team }) {
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
        {team.name}
      </Title>
      <Link href={`/teams/${team.slug}`} passHref>
        <Button variant="light" color="blue" component="a" fullWidth>
          View team
        </Button>
      </Link>
    </Card>
  );
}
