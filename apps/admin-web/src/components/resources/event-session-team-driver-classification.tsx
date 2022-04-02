import { List, Datagrid, TextField, ResourceComponentProps, DateField, ReferenceField, NumberField } from 'react-admin';

export const EventSessionTeamDriverClassificationList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="status" />
      <NumberField source="position" />
      <DateField source="time" />
      <NumberField source="points" />
      <TextField source="note" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
