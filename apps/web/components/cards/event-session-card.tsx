import { Button, Card, Space, Title, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { EventSession } from '@prisma/client';

export function EventSessionCard({ eventSession }: { eventSession: EventSession }) {
  const theme = useMantineTheme();

  const startDate = new Date(eventSession.startAt as unknown as string);

  return (
    <Card
      shadow="sm"
      p="lg"
      style={{
        background: theme.colors.blue[1],
      }}
    >
      <Title order={4}>{eventSession.name}</Title>
      <Title order={5}>
        {startDate.toLocaleDateString()} {startDate.toLocaleTimeString()}
      </Title>
      <Space h="md" />
      <Link href={`/event-sessions/${eventSession.slug}`} passHref>
        <Button variant="light" color="blue" component="a" fullWidth>
          View event session
        </Button>
      </Link>
    </Card>
  );
}

export default EventSessionCard;
