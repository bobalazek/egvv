import { List, Datagrid, TextField, DateField, ResourceComponentProps } from 'react-admin';

export const TeamList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'name',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="location" />
      <TextField source="countryCode" />
      <TextField source="url" />
      <DateField source="debutAt" />
      <DateField source="defunctAt" />
    </Datagrid>
  </List>
);
