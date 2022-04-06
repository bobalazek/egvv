import { useEffect, useState } from 'react';
import { Admin, DataProvider, Resource } from 'react-admin';
import buildGraphQLProvider from 'ra-data-graphql-simple';

import { HTTP_SERVER_GRAPHQL_PATH, HTTP_SERVER_PORT } from '@egvv/shared';
import series from './resources/series';
import season from './resources/season';
import circuit from './resources/circuit';
import driver from './resources/driver';
import team from './resources/team';
import { VehicleCreate, VehicleEdit, VehicleList, VehicleShow } from './resources/vehicle';
import seasonTeam from './resources/season-team';
import seasonTeamDriver from './resources/season-team-driver';
import {
  SeasonTeamStandingEntryCreate,
  SeasonTeamStandingEntryEdit,
  SeasonTeamStandingEntryList,
  SeasonTeamStandingEntryShow,
} from './resources/season-team-standing-entry';
import {
  SeasonTeamDriverStandingEntryCreate,
  SeasonTeamDriverStandingEntryEdit,
  SeasonTeamDriverStandingEntryList,
  SeasonTeamDriverStandingEntryShow,
} from './resources/season-team-driver-standing-entry';
import event from './resources/event';
import eventSession from './resources/event-session';
import {
  EventSessionTeamDriverCreate,
  EventSessionTeamDriverEdit,
  EventSessionTeamDriverList,
  EventSessionTeamDriverShow,
} from './resources/event-session-team-driver';
import {
  EventSessionTeamDriverLapCreate,
  EventSessionTeamDriverLapEdit,
  EventSessionTeamDriverLapList,
  EventSessionTeamDriverLapShow,
} from './resources/event-session-team-driver-lap';
import {
  EventSessionTeamDriverPitStopCreate,
  EventSessionTeamDriverPitStopEdit,
  EventSessionTeamDriverPitStopList,
  EventSessionTeamDriverPitStopShow,
} from './resources/event-session-team-driver-pit-stop';
import {
  EventSessionTeamDriverStartingGridCreate,
  EventSessionTeamDriverStartingGridEdit,
  EventSessionTeamDriverStartingGridList,
  EventSessionTeamDriverStartingGridShow,
} from './resources/event-session-team-driver-starting-grid';
import {
  EventSessionTeamDriverClassificationCreate,
  EventSessionTeamDriverClassificationEdit,
  EventSessionTeamDriverClassificationList,
  EventSessionTeamDriverClassificationShow,
} from './resources/event-session-team-driver-classification';

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
      <Resource
        name="Vehicle"
        list={VehicleList}
        show={VehicleShow}
        create={VehicleCreate}
        edit={VehicleEdit}
        options={{ label: 'Vehicles' }}
      />
      <Resource {...seasonTeam} />
      <Resource {...seasonTeamDriver} />
      <Resource
        name="SeasonTeamStandingEntry"
        list={SeasonTeamStandingEntryList}
        show={SeasonTeamStandingEntryShow}
        create={SeasonTeamStandingEntryCreate}
        edit={SeasonTeamStandingEntryEdit}
        options={{ label: 'Season Team Standing Entries' }}
      />
      <Resource
        name="SeasonTeamDriverStandingEntry"
        list={SeasonTeamDriverStandingEntryList}
        show={SeasonTeamDriverStandingEntryShow}
        create={SeasonTeamDriverStandingEntryCreate}
        edit={SeasonTeamDriverStandingEntryEdit}
        options={{ label: 'Season Team Driver Standing Entries' }}
      />
      <Resource {...event} />
      <Resource {...eventSession} />
      <Resource
        name="EventSessionTeamDriver"
        list={EventSessionTeamDriverList}
        show={EventSessionTeamDriverShow}
        create={EventSessionTeamDriverCreate}
        edit={EventSessionTeamDriverEdit}
        options={{ label: 'Event Session Team Drivers' }}
      />
      <Resource
        name="EventSessionTeamDriverLap"
        list={EventSessionTeamDriverLapList}
        show={EventSessionTeamDriverLapShow}
        create={EventSessionTeamDriverLapCreate}
        edit={EventSessionTeamDriverLapEdit}
        options={{ label: 'Event Session Team Driver Laps' }}
      />
      <Resource
        name="EventSessionTeamDriverPitStop"
        list={EventSessionTeamDriverPitStopList}
        show={EventSessionTeamDriverPitStopShow}
        create={EventSessionTeamDriverPitStopCreate}
        edit={EventSessionTeamDriverPitStopEdit}
        options={{ label: 'Event Session Team Driver Pit Stops' }}
      />
      <Resource
        name="EventSessionTeamDriverStartingGrid"
        list={EventSessionTeamDriverStartingGridList}
        show={EventSessionTeamDriverStartingGridShow}
        create={EventSessionTeamDriverStartingGridCreate}
        edit={EventSessionTeamDriverStartingGridEdit}
        options={{ label: 'Event Session Team Driver Starting Grids' }}
      />
      <Resource
        name="EventSessionTeamDriverClassification"
        list={EventSessionTeamDriverClassificationList}
        show={EventSessionTeamDriverClassificationShow}
        create={EventSessionTeamDriverClassificationCreate}
        edit={EventSessionTeamDriverClassificationEdit}
        options={{ label: 'Event Session Team Driver Classifications' }}
      />
    </Admin>
  );
}

export default App;
