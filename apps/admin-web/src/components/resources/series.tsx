import { List, Datagrid, TextField, ResourceComponentProps } from 'react-admin';

export const SeriesList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="url" />
    </Datagrid>
  </List>
);
