import { useEffect, useState } from 'react';
import { Admin, DataProvider, Resource } from 'react-admin';

import authProvider from '../providers/auth.provider';
import dataProvider from '../providers/data.provider';
import series from './resources/series';
import season from './resources/season';
import circuit from './resources/circuit';
import driver from './resources/driver';
import team from './resources/team';
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
import user from './resources/user';

export function App() {
  const [customDataProvider, setCustomDataProvider] = useState<DataProvider>();

  useEffect(() => {
    dataProvider.then((newDataProvider: DataProvider) => {
      setCustomDataProvider(newDataProvider);
    });
  }, []);

  if (!customDataProvider) {
    return <>Loading ...</>;
  }

  return (
    <Admin dataProvider={customDataProvider} authProvider={authProvider}>
      <Resource {...series} />
      <Resource {...season} />
      <Resource {...circuit} />
      <Resource {...driver} />
      <Resource {...team} />
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
      <Resource {...user} />
    </Admin>
  );
}

export default App;
