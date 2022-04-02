import { useEffect, useState } from 'react';
import { Admin, DataProvider, Resource } from 'react-admin';
import buildGraphQLProvider from 'ra-data-graphql-simple';

import { SeriesList } from '../resources/series';
import { SeasonList } from '../resources/season';
import { DriverList } from '../resources/drivers';
import { HTTP_SERVER_GRAPHQL_PATH, HTTP_SERVER_PORT } from '@egvv/shared';

import './app.module.css';

export function App() {
  const [dataProvider, setDataProvider] = useState<DataProvider>();

  useEffect(() => {
    (async () => {
      const newDataProvider = await buildGraphQLProvider({
        clientOptions: {
          uri: 'http://localhost:' + HTTP_SERVER_PORT + HTTP_SERVER_GRAPHQL_PATH,
        },
      });

      setDataProvider(newDataProvider);
    })();
  }, []);

  if (!dataProvider) {
    return <>Loading ...</>;
  }

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="Series" list={SeriesList} />
      <Resource name="Season" list={SeasonList} />
      <Resource name="Driver" list={DriverList} />
    </Admin>
  );
}

export default App;
