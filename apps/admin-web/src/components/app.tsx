import { useEffect, useState } from 'react';
import { Admin, DataProvider, Resource } from 'react-admin';
import buildGraphQLProvider from 'ra-data-graphql-simple';

import { HTTP_SERVER_GRAPHQL_PATH, HTTP_SERVER_PORT } from '@egvv/shared';
import { SeriesList } from './resources/series';
import { SeasonList } from './resources/season';
import { CircuitList } from './resources/circuit';
import { DriverList } from './resources/driver';
import { TeamList } from './resources/team';
import { SeasonTeamList } from './resources/season-team';
import { SeasonTeamDriverList } from './resources/season-team-driver';

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
      <Resource name="Series" list={SeriesList} options={{ label: 'Series' }} />
      <Resource name="Season" list={SeasonList} options={{ label: 'Seasons' }} />
      <Resource name="Circuit" list={CircuitList} options={{ label: 'Circuits' }} />
      <Resource name="Driver" list={DriverList} options={{ label: 'Drivers' }} />
      <Resource name="Team" list={TeamList} options={{ label: 'Teams' }} />
      <Resource name="SeasonTeam" list={SeasonTeamList} options={{ label: 'Season Teams' }} />
      <Resource name="SeasonTeamDriver" list={SeasonTeamDriverList} options={{ label: 'Season Team Drivers' }} />
    </Admin>
  );
}

export default App;
