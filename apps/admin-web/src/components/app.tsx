import { useEffect, useState } from 'react';
import { Admin, DataProvider, Resource } from 'react-admin';
import buildGraphQLProvider from 'ra-data-graphql-simple';

import { HTTP_SERVER_GRAPHQL_PATH, HTTP_SERVER_PORT } from '@egvv/shared';
import { SeriesCreate, SeriesEdit, SeriesList, SeriesShow } from './resources/series';
import { SeasonCreate, SeasonEdit, SeasonList, SeasonShow } from './resources/season';
import { CircuitCreate, CircuitEdit, CircuitList, CircuitShow } from './resources/circuit';
import { DriverCreate, DriverEdit, DriverList, DriverShow } from './resources/driver';
import { TeamCreate, TeamEdit, TeamList, TeamShow } from './resources/team';
import { VehicleCreate, VehicleEdit, VehicleList, VehicleShow } from './resources/vehicle';
import { SeasonTeamCreate, SeasonTeamEdit, SeasonTeamList, SeasonTeamShow } from './resources/season-team';
import {
  SeasonTeamDriverCreate,
  SeasonTeamDriverEdit,
  SeasonTeamDriverList,
  SeasonTeamDriverShow,
} from './resources/season-team-driver';
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
import { EventCreate, EventEdit, EventList, EventShow } from './resources/event';
import { EventSessionList } from './resources/event-session';
import { EventSessionTeamDriverList } from './resources/event-session-team-driver';
import { EventSessionTeamDriverLapList } from './resources/event-session-team-driver-lap';
import { EventSessionTeamDriverPitStopList } from './resources/event-session-team-driver-pit-stop';
import { EventSessionTeamDriverStartingGridList } from './resources/event-session-team-driver-starting-grid';
import { EventSessionTeamDriverClassificationList } from './resources/event-session-team-driver-classification';

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
      <Resource
        name="Series"
        list={SeriesList}
        show={SeriesShow}
        create={SeriesCreate}
        edit={SeriesEdit}
        options={{ label: 'Series' }}
      />
      <Resource
        name="Season"
        list={SeasonList}
        show={SeasonShow}
        create={SeasonCreate}
        edit={SeasonEdit}
        options={{ label: 'Seasons' }}
      />
      <Resource
        name="Circuit"
        list={CircuitList}
        show={CircuitShow}
        create={CircuitCreate}
        edit={CircuitEdit}
        options={{ label: 'Circuits' }}
      />
      <Resource
        name="Driver"
        list={DriverList}
        show={DriverShow}
        create={DriverCreate}
        edit={DriverEdit}
        options={{ label: 'Drivers' }}
      />
      <Resource
        name="Team"
        list={TeamList}
        show={TeamShow}
        create={TeamCreate}
        edit={TeamEdit}
        options={{ label: 'Teams' }}
      />
      <Resource
        name="Vehicle"
        list={VehicleList}
        show={VehicleShow}
        create={VehicleCreate}
        edit={VehicleEdit}
        options={{ label: 'Vehicles' }}
      />
      <Resource
        name="SeasonTeam"
        list={SeasonTeamList}
        show={SeasonTeamShow}
        create={SeasonTeamCreate}
        edit={SeasonTeamEdit}
        options={{ label: 'Season Teams' }}
      />
      <Resource
        name="SeasonTeamDriver"
        list={SeasonTeamDriverList}
        show={SeasonTeamDriverShow}
        create={SeasonTeamDriverCreate}
        edit={SeasonTeamDriverEdit}
        options={{ label: 'Season Team Drivers' }}
      />
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
      <Resource
        name="Event"
        list={EventList}
        show={EventShow}
        create={EventCreate}
        edit={EventEdit}
        options={{ label: 'Events' }}
      />
      <Resource name="EventSession" list={EventSessionList} options={{ label: 'Event Sessions' }} />
      <Resource
        name="EventSessionTeamDriver"
        list={EventSessionTeamDriverList}
        options={{ label: 'Event Session Team Drivers' }}
      />
      <Resource
        name="EventSessionTeamDriverLap"
        list={EventSessionTeamDriverLapList}
        options={{ label: 'Event Session Team Driver Laps' }}
      />
      <Resource
        name="EventSessionTeamDriverPitStop"
        list={EventSessionTeamDriverPitStopList}
        options={{ label: 'Event Session Team Driver Pit Stops' }}
      />
      <Resource
        name="EventSessionTeamDriverStartingGrid"
        list={EventSessionTeamDriverStartingGridList}
        options={{ label: 'Event Session Team Driver Starting Grids' }}
      />
      <Resource
        name="EventSessionTeamDriverClassification"
        list={EventSessionTeamDriverClassificationList}
        options={{ label: 'Event Session Team Driver Classifications' }}
      />
    </Admin>
  );
}

export default App;
