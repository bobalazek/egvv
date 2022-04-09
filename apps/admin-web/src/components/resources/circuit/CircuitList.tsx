import { List, Datagrid, TextField, ShowButton, EditButton, DeleteButton, ListProps } from 'react-admin';

export const CircuitList = (props: ListProps) => (
  <List
    sort={{
      field: 'name',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="location" />
      <TextField source="locationLatitude" />
      <TextField source="locationLongitude" />
      <TextField source="countryCode" />
      <TextField source="timezone" />
      <TextField source="url" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
