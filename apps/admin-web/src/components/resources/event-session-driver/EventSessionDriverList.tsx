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

export const EventSessionDriverList = (props: ListProps) => (
  <List
    sort={{
      field: 'number',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="seasonDriverId" reference="SeasonDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="number" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
