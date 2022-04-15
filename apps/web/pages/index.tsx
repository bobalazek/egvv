import { Button, Text, Container } from '@mantine/core';
import Link from 'next/link';

export function Index() {
  return (
    <Container mt={40}>
      <Text align="center">
        <h1>Engine Goes Vroom Vrom</h1>
        <h2>As you can clearly see, it is not ready yet.</h2>
        <h2>With that being said, you can see a sneak peak of what we are doing right ...</h2>
        <Link href="/series" passHref>
          <Button component="a" size="lg">
            Here
          </Button>
        </Link>
      </Text>
    </Container>
  );
}

export default Index;
