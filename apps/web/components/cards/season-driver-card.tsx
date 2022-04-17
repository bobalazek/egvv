import Link from 'next/link';
import { Button, Card, Title, useMantineTheme } from '@mantine/core';
import { SeasonTeam, SeasonDriver, Driver, Team, Season } from '@prisma/client';

export function SeasonDriverCard({
  seasonDriver,
  seasonTeam,
  hideSeason = false,
  hideViewDriverButton = false,
  hideViewSeasonButton = false,
}: {
  seasonDriver: SeasonDriver & {
    driver: Driver;
  };
  seasonTeam: SeasonTeam & {
    season: Season;
    team: Team;
  };
  hideSeason?: boolean;
  hideViewDriverButton?: boolean;
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
        {seasonDriver.driver.firstName} {seasonDriver.driver.lastName}
      </Title>
      <Title order={5} mb={10}>
        {seasonTeam.name}
      </Title>
      {!hideSeason && <Title order={6}>{seasonTeam.season.name}</Title>}
      {!hideViewDriverButton && (
        <Link href={`/drivers/${seasonDriver.driver.slug}`} passHref>
          <Button variant="light" color="blue" component="a" fullWidth mt={10}>
            View driver
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
