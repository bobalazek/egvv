import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

import { Header } from '../components/layout/header';

import './styles.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>EGGV</title>
      </Head>
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
    </>
  );
}

export default App;
