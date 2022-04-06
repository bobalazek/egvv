import { useEffect, useState } from 'react';
import { Admin, DataProvider, Resource } from 'react-admin';
import buildGraphQLProvider from 'ra-data-graphql-simple';

import { HTTP_SERVER_GRAPHQL_PATH, HTTP_SERVER_PORT } from '@egvv/shared';
import series from './resources/series';
import season from './resources/season';
import circuit from './resources/circuit';
import driver from './resources/driver';
import team from './resources/team';
import vehicle from './resources/vehicle';
import seasonTeam from './resources/season-team';
import seasonTeamDriver from './resources/season-team-driver';
import seasonTeamStandingEntry from './resources/season-team-standing-entry';
import seasonTeamDriverStandingEntry from './resources/season-team-driver-standing-entry';
import event from './resources/event';
import eventSession from './resources/event-session';
import eventSessionTeamDriver from './resources/event-session-team-driver';
import eventSessionTeamDriverLap from './resources/event-session-team-driver-lap';
import eventSessionTeamDriverPitStop from './resources/event-session-team-driver-pit-stop';
import eventSessionTeamDriverStartingGrid from './resources/event-session-team-driver-starting-grid';
import eventSessionTeamDriverClassification from './resources/event-session-team-driver-classification';

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
      <Resource {...series} />
      <Resource {...season} />
      <Resource {...circuit} />
      <Resource {...driver} />
      <Resource {...team} />
      <Resource {...vehicle} />
      <Resource {...seasonTeam} />
      <Resource {...seasonTeamDriver} />
      <Resource {...seasonTeamStandingEntry} />
      <Resource {...seasonTeamDriverStandingEntry} />
      <Resource {...event} />
      <Resource {...eventSession} />
      <Resource {...eventSessionTeamDriver} />
      <Resource {...eventSessionTeamDriverLap} />
      <Resource {...eventSessionTeamDriverPitStop} />
      <Resource {...eventSessionTeamDriverStartingGrid} />
      <Resource {...eventSessionTeamDriverClassification} />
    </Admin>
  );
}

export default App;
