import {
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  ShowButton,
  EditButton,
  Show,
  SimpleShowLayout,
  ReferenceManyField,
  ShowProps,
} from 'react-admin';

export const EventShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
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
      <ReferenceManyField
        target="eventId"
        reference="EventSession"
        label="Event Sessions"
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
    </SimpleShowLayout>
  </Show>
);
