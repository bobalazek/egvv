import { Button, Card, Space, Title, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { Event } from '@prisma/client';

export function EventCard({ event }: { event: Event }) {
  const theme = useMantineTheme();

  const raceAt = new Date(event.raceAt as unknown as string);

  return (
    <Card
      shadow="sm"
      p="lg"
      style={{
        background: theme.colors.blue[1],
      }}
    >
      <Title order={4}>{event.name}</Title>
      <Title order={5}>{raceAt.toLocaleDateString()}</Title>
      <Space h="md" />
      <Link href={`/events/${event.slug}`} passHref>
        <Button variant="light" color="blue" component="a" fullWidth>
          View event
        </Button>
      </Link>
    </Card>
  );
}

export default EventCard;
