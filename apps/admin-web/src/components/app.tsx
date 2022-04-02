import { useEffect, useState } from 'react';
import { Admin, DataProvider, Resource } from 'react-admin';
import buildGraphQLProvider from 'ra-data-graphql-simple';

import { HTTP_SERVER_GRAPHQL_PATH, HTTP_SERVER_PORT } from '@egvv/shared';
import { SeriesList } from './resources/series';
import { SeasonList } from './resources/season';
import { CircuitList } from './resources/circuit';
import { DriverList } from './resources/driver';
import { TeamList } from './resources/team';
import { VehicleList } from './resources/vehicle';
import { SeasonTeamList } from './resources/season-team';
import { SeasonTeamDriverList } from './resources/season-team-driver';
import { SeasonTeamStandingEntryList } from './resources/season-team-standing-entry';
import { SeasonTeamDriverStandingEntryList } from './resources/season-team-driver-standing-entry';
import { EventList } from './resources/event';
import { EventSessionList } from './resources/event-session';
import { EventSessionTeamDriverList } from './resources/event-session-team-driver';

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
      <Resource name="Vehicle" list={VehicleList} options={{ label: 'Vehicles' }} />
      <Resource name="SeasonTeam" list={SeasonTeamList} options={{ label: 'Season Teams' }} />
      <Resource name="SeasonTeamDriver" list={SeasonTeamDriverList} options={{ label: 'Season Team Drivers' }} />
      <Resource
        name="SeasonTeamStandingEntry"
        list={SeasonTeamStandingEntryList}
        options={{ label: 'Season Team Standing Entries' }}
      />
      <Resource
        name="SeasonTeamDriverStandingEntry"
        list={SeasonTeamDriverStandingEntryList}
        options={{ label: 'Season Team Driver Standing Entries' }}
      />
      <Resource name="Event" list={EventList} options={{ label: 'Events' }} />
      <Resource name="EventSession" list={EventSessionList} options={{ label: 'Event Sessions' }} />
      <Resource
        name="EventSessionTeamDriver"
        list={EventSessionTeamDriverList}
        options={{ label: 'Event Session Team Drivers' }}
      />
    </Admin>
  );
}

export default App;
