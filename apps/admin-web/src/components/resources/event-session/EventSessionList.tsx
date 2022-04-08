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
} from 'react-admin';

export const EventSessionList = (props: ListProps) => (
  <List
    sort={{
      field: 'name',
      order: 'asc',
    }}
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
