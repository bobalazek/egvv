import { Button, Card, Title, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { SeasonTeam, SeasonDriver, Driver, Team } from '@prisma/client';

export function SeasonDriverCard({
  seasonDriver,
  seasonTeam,
}: {
  seasonDriver: SeasonDriver & {
    driver: Driver;
  };
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
        {seasonDriver.driver.firstName} {seasonDriver.driver.lastName}
      </Title>
      <Title order={5} mb={10}>
        {seasonTeam.name}
      </Title>
      <Link href={`/drivers/${seasonDriver.driver.slug}`} passHref>
        <Button variant="light" color="blue" component="a" fullWidth>
          View driver
        </Button>
      </Link>
    </Card>
  );
}
