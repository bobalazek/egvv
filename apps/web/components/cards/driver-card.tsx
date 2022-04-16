import Link from 'next/link';
import { Button, Card, Title, useMantineTheme } from '@mantine/core';
import { Driver } from '@prisma/client';

export function DriverCard({ driver }: { driver: Driver }) {
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
        {driver.firstName} {driver.lastName}
      </Title>
      <Link href={`/drivers/${driver.slug}`} passHref>
        <Button variant="light" color="blue" component="a" fullWidth>
          View driver
        </Button>
      </Link>
    </Card>
  );
}
