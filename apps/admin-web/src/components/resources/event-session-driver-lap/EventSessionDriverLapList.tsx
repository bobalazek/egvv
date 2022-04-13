import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  BooleanField,
  ShowButton,
  EditButton,
  DeleteButton,
  ListProps,
  TextInput,
  NumberField,
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
      <NumberField source="timeMilliseconds" />
      <TextField source="position" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
