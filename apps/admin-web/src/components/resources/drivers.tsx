import { List, Datagrid, TextField, ResourceComponentProps } from 'react-admin';

export const DriverList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="countryCode" />
      <TextField source="url" />
    </Datagrid>
  </List>
);
