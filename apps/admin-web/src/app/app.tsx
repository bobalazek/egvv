import { useEffect, useState } from 'react';
import { Admin, DataProvider } from 'react-admin';
import buildGraphQLProvider from 'ra-data-graphql';

import './app.module.css';

export function App() {
  const [dataProvider, setDataProvider] = useState<DataProvider>();

  useEffect(() => {
    (async () => {
      const newDataProvider = await buildGraphQLProvider({
        // TODO
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
