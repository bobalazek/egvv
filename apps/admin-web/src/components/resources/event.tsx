import { List, Datagrid, TextField, ResourceComponentProps, DateField, ReferenceField } from 'react-admin';

export const EventList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
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
    </Datagrid>
  </List>
);
