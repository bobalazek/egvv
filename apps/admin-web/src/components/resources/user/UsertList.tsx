import { List, Datagrid, TextField, ShowButton, EditButton, DeleteButton, ListProps, TextInput } from 'react-admin';

export const UserList = (props: ListProps) => (
  <List
    sort={{
      field: 'createdAt',
      order: 'asc',
    }}
    filters={[<TextInput label="Search" source="q" alwaysOn />]}
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
