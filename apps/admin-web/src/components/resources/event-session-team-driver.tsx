import { List, Datagrid, TextField, ResourceComponentProps, DateField, ReferenceField } from 'react-admin';

export const EventSessionTeamDriverList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="type" />
      <DateField source="startAt" showTime={true} />
      <DateField source="endAt" showTime={true} />
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
