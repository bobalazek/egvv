import Link from 'next/link';
import { Button, Card, Title, useMantineTheme } from '@mantine/core';
import { Season, SeasonTeam, Team } from '@prisma/client';

export function SeasonTeamCard({
  seasonTeam,
  hideSeason = false,
  hideViewTeamButton = false,
  hideViewSeasonButton = false,
}: {
  seasonTeam: SeasonTeam & {
    season: Season;
    team: Team;
  };
  hideSeason?: boolean;
  hideViewTeamButton?: boolean;
  hideViewSeasonButton?: boolean;
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
      {!hideSeason && <Title order={6}>{seasonTeam.season.name}</Title>}
      {!hideViewTeamButton && (
        <Link href={`/teams/${seasonTeam.team.slug}`} passHref>
          <Button variant="light" color="blue" component="a" fullWidth mt={10}>
            View team
          </Button>
        </Link>
      )}
      {!hideViewSeasonButton && (
        <Link href={`/seasons/${seasonTeam.season.slug}`} passHref>
          <Button variant="light" color="blue" component="a" fullWidth mt={10}>
            View season
          </Button>
        </Link>
      )}
    </Card>
  );
}
