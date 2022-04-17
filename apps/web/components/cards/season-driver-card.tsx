import Link from 'next/link';
import { Button, Card, Title, useMantineTheme } from '@mantine/core';
import { SeasonTeam, SeasonDriver, Driver, Team, Season } from '@prisma/client';

export function SeasonDriverCard({
  seasonDriver,
  seasonTeam,
}: {
  seasonDriver: SeasonDriver & {
    driver: Driver;
  };
  seasonTeam: SeasonTeam & {
    season: Season;
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
        {seasonDriver.driver.firstName} {seasonDriver.driver.lastName}
      </Title>
      <Title order={5} mb={10}>
        {seasonTeam.name}
      </Title>
      <Title order={6} mb={10}>
        {seasonTeam.season.name}
      </Title>
      <Link href={`/drivers/${seasonDriver.driver.slug}`} passHref>
        <Button variant="light" color="blue" component="a" fullWidth>
          View driver
        </Button>
      </Link>
    </Card>
  );
}
