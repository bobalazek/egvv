import Link from 'next/link';
import { Button, Text, Container } from '@mantine/core';

export function Index() {
  return (
    <Container mt={40}>
      <Text align="center">
        <h1>Engine Goes Vroom Vrom</h1>
        <h2>As you can clearly see, it is not ready yet.</h2>
        <h2>With that being said, you can see a sneak peak of what we are doing right down below:</h2>
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
