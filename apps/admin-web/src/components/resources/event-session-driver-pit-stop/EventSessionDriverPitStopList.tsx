import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  ShowButton,
  EditButton,
  DeleteButton,
  ListProps,
} from 'react-admin';

export const EventSessionDriverPitStopList = (props: ListProps) => (
  <List
    sort={{
      field: 'lap',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="eventSessionDriverId" reference="EventSessionDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="lap" />
      <TextField source="timeMilliseconds" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);