import { List, Datagrid, TextField, ResourceComponentProps, DateField, ReferenceField } from 'react-admin';

export const EventSessionTeamDriverStartingGridList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="position" />
      <DateField source="time" />
      <TextField source="note" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
