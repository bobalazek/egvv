import { List, Datagrid, TextField, ShowButton, EditButton, DeleteButton, ListProps } from 'react-admin';

export const UserList = (props: ListProps) => (
  <List
    sort={{
      field: 'username',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="username" />
      <TextField source="email" />
      <TextField source="roles" />
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
