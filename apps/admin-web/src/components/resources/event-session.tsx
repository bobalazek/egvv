import { List, Datagrid, TextField, ResourceComponentProps, DateField, ReferenceField } from 'react-admin';

export const EventSessionList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'name',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="type" />
      <DateField source="startAt" showTime={true} />
      <DateField source="endAt" showTime={true} />
      <ReferenceField source="eventId" reference="Event">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
