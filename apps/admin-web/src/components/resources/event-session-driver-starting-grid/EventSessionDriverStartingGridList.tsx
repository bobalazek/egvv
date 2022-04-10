import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  ShowButton,
  EditButton,
  DeleteButton,
  ListProps,
  TextInput,
} from 'react-admin';

export const EventSessionDriverStartingGridList = (props: ListProps) => (
  <List
    sort={{
      field: 'position',
      order: 'asc',
    }}
    filters={[<TextInput label="Search" source="q" alwaysOn />]}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="eventSessionDriverId" reference="EventSessionDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="position" />
      <DateField source="time" />
      <TextField source="note" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
