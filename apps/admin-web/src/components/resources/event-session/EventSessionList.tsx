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

export const EventSessionList = (props: ListProps) => (
  <List
    sort={{
      field: 'name',
      order: 'asc',
    }}
    filters={[<TextInput label="Search" source="q" alwaysOn />]}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="eventId" reference="Event">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="type" />
      <DateField source="startAt" showTime={true} />
      <DateField source="endAt" showTime={true} />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
