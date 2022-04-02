import { List, Datagrid, TextField, ResourceComponentProps, ReferenceField } from 'react-admin';

export const EventSessionTeamDriverList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="number" />
      <TextField source="code" />
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="seasonTeamDriverId" reference="SeasonTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
