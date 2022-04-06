import { List, Datagrid, TextField, ShowButton, EditButton, DeleteButton, ListProps } from 'react-admin';

export const DriverList = (props: ListProps) => (
  <List
    sort={{
      field: 'lastName',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="slug" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="countryCode" />
      <TextField source="url" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
