import {
  TextField,
  DateField,
  ReferenceField,
  Show,
  TabbedShowLayout,
  ShowProps,
  Tab,
  ReferenceManyField,
  Datagrid,
  ShowButton,
  EditButton,
  CreateButton,
  BooleanField,
} from 'react-admin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeasonShowTitle = (data: any) => <span>Seasons - {data.record.name}</span>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeriesShowAddTeamButton = (data: any) => (
  <CreateButton
    to={`/SeasonTeam/create?seasonId=${data.record.id}`}
    size="large"
    variant="outlined"
    label="Add a season team"
  />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeriesShowAddDriverButton = (data: any) => (
  <CreateButton to={`/SeasonDriver/create?seasonTeamId=${data.record.id}`} label="Add a driver" />
);

export const SeasonShow = (props: ShowProps) => (
  <Show title={<SeasonShowTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="General">
        <TextField source="slug" />
        <TextField source="name" />
        <TextField source="year" />
        <DateField source="startAt" />
        <DateField source="endAt" />
        <ReferenceField source="seriesId" reference="Series">
          <TextField source="name" />
        </ReferenceField>
      </Tab>
      <Tab label="Teams" path="teams">
        <ReferenceManyField
          target="seasonId"
          reference="SeasonTeam"
          label=""
          sort={{
            field: 'name',
            order: 'asc',
          }}
          perPage={200}
        >
          <Datagrid empty={<>No teams found</>}>
            <TextField source="name" />
            <TextField source="shortName" />
            <ShowButton />
            <EditButton />
            <SeriesShowAddDriverButton />
          </Datagrid>
        </ReferenceManyField>
        <SeriesShowAddTeamButton />
        <br />
      </Tab>
      <Tab label="Drivers" path="drivers">
        <ReferenceManyField
          target="seasonId"
          reference="SeasonDriver"
          label=""
          sort={{
            field: 'seasonTeamId',
            order: 'asc',
          }}
          perPage={200}
        >
          <Datagrid empty={<>No drivers found</>}>
            <ReferenceField source="seasonTeamId" reference="SeasonTeam">
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="driverId" reference="Driver">
              <TextField source="name" />
            </ReferenceField>
            <TextField source="code" />
            <TextField source="number" />
            <BooleanField source="isTemporary" />
            <ShowButton />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
