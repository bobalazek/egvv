import Link from 'next/link';
import { Button, Card, Title, useMantineTheme } from '@mantine/core';
import { SeasonTeam, Team } from '@prisma/client';

export function SeasonTeamCard({
  seasonTeam,
}: {
  seasonTeam: SeasonTeam & {
    team: Team;
  };
}) {
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
        {seasonTeam.name}
      </Title>
      <Link href={`/teams/${seasonTeam.team.slug}`} passHref>
        <Button variant="light" color="blue" component="a" fullWidth>
          View team
        </Button>
      </Link>
    </Card>
  );
}
