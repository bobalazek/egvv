import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  BooleanField,
  ShowButton,
  EditButton,
  DeleteButton,
  ListProps,
  TextInput,
} from 'react-admin';

export const EventSessionDriverLapList = (props: ListProps) => (
  <List
    sort={{
      field: 'lap',
      order: 'asc',
    }}
    filters={[<TextInput label="Search" source="q" alwaysOn />]}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="eventSessionDriverId" reference="EventSessionDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="lap" />
      <BooleanField source="isDeleted" />
      <DateField source="time" />
      <TextField source="position" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
