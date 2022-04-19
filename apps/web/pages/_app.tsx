import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';

import { apolloClient } from '@egvv/shared-apollo-client';
import { Header } from '../components/layout/header';

import './styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>EGVV</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
          }}
        >
          <Header
            links={[
              { href: '/', label: 'Home' },
              { href: '/series', label: 'Series' },
              { href: '/teams', label: 'Teams' },
              { href: '/drivers', label: 'Drivers' },
            ]}
          />
          <Component {...pageProps} />
        </MantineProvider>
      </ApolloProvider>
    </>
  );
}
