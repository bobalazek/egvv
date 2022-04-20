import Link from 'next/link';
import { Button, Card, Title, useMantineTheme } from '@mantine/core';
import { Circuit } from '@prisma/client';

export function CircuitCard({ circuit }: { circuit: Circuit }) {
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
        {circuit.name}
      </Title>
      <Link href={`/circuits/${circuit.slug}`} passHref>
        <Button variant="light" color="blue" component="a" fullWidth>
          View circuit
        </Button>
      </Link>
    </Card>
  );
}
