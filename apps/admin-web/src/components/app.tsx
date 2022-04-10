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
import seasonDriver from './resources/season-driver';
import seasonTeamStandingEntry from './resources/season-team-standing-entry';
import seasonDriverStandingEntry from './resources/season-driver-standing-entry';
import event from './resources/event';
import eventSession from './resources/event-session';
import eventSessionDriver from './resources/event-session-driver';
import eventSessionDriverLap from './resources/event-session-driver-lap';
import eventSessionDriverPitStop from './resources/event-session-driver-pit-stop';
import eventSessionDriverStartingGrid from './resources/event-session-driver-starting-grid';
import eventSessionDriverClassification from './resources/event-session-driver-classification';
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
      <Resource {...seasonDriver} />
      <Resource {...seasonTeamStandingEntry} />
      <Resource {...seasonDriverStandingEntry} />
      <Resource {...event} />
      <Resource {...eventSession} />
      <Resource {...eventSessionDriver} />
      <Resource {...eventSessionDriverLap} />
      <Resource {...eventSessionDriverPitStop} />
      <Resource {...eventSessionDriverStartingGrid} />
      <Resource {...eventSessionDriverClassification} />
      <Resource {...user} />
    </Admin>
  );
}

export default App;
