import {
  List,
  Datagrid,
  TextField,
  ResourceComponentProps,
  DateField,
  ReferenceField,
  BooleanField,
} from 'react-admin';

export const EventSessionTeamDriverLapList = (props: ResourceComponentProps) => (
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
      <BooleanField source="isDeleted" />
      <DateField source="time" />
      <TextField source="position" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
