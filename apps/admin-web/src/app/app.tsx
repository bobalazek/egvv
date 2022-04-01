import { useEffect, useState } from 'react';
import { Admin, DataProvider } from 'react-admin';
import buildGraphQLProvider from 'ra-data-graphql-simple';

import { HTTP_SERVER_PORT } from '@egvv/shared';

import './app.module.css';

export function App() {
  const [dataProvider, setDataProvider] = useState<DataProvider>();

  useEffect(() => {
    (async () => {
      const newDataProvider = await buildGraphQLProvider({
        clientOptions: {
          uri: 'http://localhost:' + HTTP_SERVER_PORT,
        },
      });

      setDataProvider(newDataProvider);
    })();
  }, []);

  if (!dataProvider) {
    return <>Loading ...</>;
  }

  return <Admin dataProvider={dataProvider}></Admin>;
}

export default App;
