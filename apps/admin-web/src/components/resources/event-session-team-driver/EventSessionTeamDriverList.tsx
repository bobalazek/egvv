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

export const EventSessionTeamDriverList = (props: ListProps) => (
  <List
    sort={{
      field: 'number',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="number" />
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="seasonTeamDriverId" reference="SeasonTeamDriver">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);