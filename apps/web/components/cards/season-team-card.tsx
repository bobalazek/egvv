import Link from 'next/link';
import { Button, Card, Title, useMantineTheme } from '@mantine/core';
import { Season, SeasonTeam, Team } from '@prisma/client';

export function SeasonTeamCard({
  seasonTeam,
  hideButton = false,
}: {
  seasonTeam: SeasonTeam & {
    season: Season;
    team: Team;
  };
  hideButton?: boolean;
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
      <Title order={5} mb={10}>
        {seasonTeam.season.name}
      </Title>
      {!hideButton && (
        <Link href={`/teams/${seasonTeam.team.slug}`} passHref>
          <Button variant="light" color="blue" component="a" fullWidth>
            View team
          </Button>
        </Link>
      )}
    </Card>
  );
}
