import { List, Datagrid, TextField, ResourceComponentProps } from 'react-admin';

export const VehicleList = (props: ResourceComponentProps) => (
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
      <TextField source="powerUnit" />
      <TextField source="note" />
    </Datagrid>
  </List>
);
