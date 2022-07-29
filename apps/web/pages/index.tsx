import Link from 'next/link';
import { Button, Text, Container } from '@mantine/core';

export function Index() {
  return (
    <Container mt={40}>
      <Text align="center">
        <h1>Engine Goes Vroom Vrom</h1>
        <h2>This website is still a work in progress.</h2>
        <Link href="/series" passHref>
          <Button component="a" size="lg">
            View series
          </Button>
        </Link>
      </Text>
    </Container>
  );
}

export default Index;
