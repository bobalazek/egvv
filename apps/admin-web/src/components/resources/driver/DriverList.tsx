import { List, Datagrid, TextField, ShowButton, EditButton, DeleteButton, ListProps, TextInput } from 'react-admin';

export const DriverList = (props: ListProps) => (
  <List
    sort={{
      field: 'lastName',
      order: 'asc',
    }}
    filters={[<TextInput label="Search" source="q" alwaysOn />]}
    {...props}
  >
    <Datagrid>
      <TextField source="slug" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="countryCode" />
      <TextField source="url" />
      <TextField source="nickname" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
