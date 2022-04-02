import { List, Datagrid, TextField, ResourceComponentProps } from 'react-admin';

export const VehicleList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="powerUnit" />
      <TextField source="note" />
    </Datagrid>
  </List>
);
