import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

import { HeaderResponsive } from '../components/layout/header-responsive';

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
        <HeaderResponsive
          links={[
            { href: '/', label: 'Home' },
            { href: '/series', label: 'Series' },
          ]}
        />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default App;
