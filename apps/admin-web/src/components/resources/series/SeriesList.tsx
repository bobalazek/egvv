import { List, Datagrid, TextField, ShowButton, EditButton, DeleteButton, ListProps, TextInput } from 'react-admin';

export const SeriesList = (props: ListProps) => (
  <List
    sort={{
      field: 'name',
      order: 'asc',
    }}
    filters={[<TextInput label="Search" source="q" alwaysOn />]}
    {...props}
  >
    <Datagrid>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="url" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
