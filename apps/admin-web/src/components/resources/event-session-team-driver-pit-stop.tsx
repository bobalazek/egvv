import { List, Datagrid, TextField, ResourceComponentProps, ReferenceField } from 'react-admin';

export const EventSessionTeamDriverPitStopList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'lap',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="lap" />
      <TextField source="timeMilliseconds" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
