import {
  TextField,
  ReferenceField,
  Show,
  TabbedShowLayout,
  ShowProps,
  Tab,
  ReferenceManyField,
  Datagrid,
  ShowButton,
  EditButton,
  BooleanField,
  CreateButton,
} from 'react-admin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeasonTeamShowTitle = (data: any) => <span>Seasons - {data.record.nameWithSeason}</span>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeasonTeamShowAddDriverButton = (data: any) => (
  <CreateButton
    to={`/SeasonDriver/create?seasonTeamId=${data.record.id}`}
    size="large"
    variant="outlined"
    label="Add a driver"
  />
);

export const SeasonTeamShow = (props: ShowProps) => (
  <Show title={<SeasonTeamShowTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="General">
        <TextField source="name" />
        <TextField source="shortName" />
        <TextField source="powerUnit" />
        <TextField source="chassis" />
        <ReferenceField source="seasonId" reference="Season">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="teamId" reference="Team">
          <TextField source="name" />
        </ReferenceField>
      </Tab>
      <Tab label="Drivers" path="drivers">
        <ReferenceManyField
          target="seasonTeamId"
          reference="SeasonDriver"
          label=""
          sort={{
            field: 'code',
            order: 'desc',
          }}
          perPage={200}
        >
          <Datagrid empty={<>No drivers found</>}>
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
        <SeasonTeamShowAddDriverButton />
        <br />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
