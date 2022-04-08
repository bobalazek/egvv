import {
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  ShowButton,
  EditButton,
  Show,
  ReferenceManyField,
  ShowProps,
  TabbedShowLayout,
  Tab,
  CreateButton,
} from 'react-admin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EventShowTitle = (data: any) => <span>Event - {data.record.name}</span>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EventShowAddEventSessionButton = (data: any) => (
  <CreateButton
    to={`/EventSession/create?eventId=${data.record.id}`}
    size="large"
    variant="outlined"
    label="Add an event session"
  />
);

export const EventShow = (props: ShowProps) => (
  <Show title={<EventShowTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="General">
        <TextField source="slug" />
        <TextField source="name" />
        <TextField source="round" />
        <TextField source="laps" />
        <TextField source="lapDistance" />
        <DateField source="raceAt" showTime={true} />
        <TextField source="url" />
        <TextField source="circuitLayout" />
        <ReferenceField source="seasonId" reference="Season">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="circuitId" reference="Circuit">
          <TextField source="name" />
        </ReferenceField>
      </Tab>
      <Tab label="Sessions" path="sessions">
        <ReferenceManyField
          target="eventId"
          reference="EventSession"
          label=""
          sort={{
            field: 'startAt',
            order: 'asc',
          }}
        >
          <Datagrid>
            <TextField source="name" />
            <TextField source="startAt" />
            <TextField source="endAt" />
            <ShowButton />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
        <EventShowAddEventSessionButton />
        <br />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
