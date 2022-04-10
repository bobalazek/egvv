import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  NumberField,
  ShowButton,
  EditButton,
  DeleteButton,
  ListProps,
  TextInput,
} from 'react-admin';

export const EventSessionDriverClassificationList = (props: ListProps) => (
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
      <TextField source="status" />
      <TextField source="position" />
      <DateField source="time" />
      <NumberField source="points" />
      <TextField source="note" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
