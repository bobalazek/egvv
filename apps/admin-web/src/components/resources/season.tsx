import { List, Datagrid, TextField, ResourceComponentProps, DateField } from 'react-admin';

export const SeasonList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="year" />
      <DateField source="startAt" />
      <DateField source="endAt" />
    </Datagrid>
  </List>
);
