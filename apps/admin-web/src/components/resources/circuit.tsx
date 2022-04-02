import { List, Datagrid, TextField, ResourceComponentProps } from 'react-admin';

export const CircuitList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="location" />
      <TextField source="locationLatitude" />
      <TextField source="locationLongitude" />
      <TextField source="countryCode" />
      <TextField source="url" />
    </Datagrid>
  </List>
);
