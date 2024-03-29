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

export const EventList = (props: ListProps) => (
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
      <TextField source="fullName" />
      <TextField source="round" />
      <TextField source="laps" />
      <TextField source="lapDistance" />
      <DateField source="raceAt" showTime={true} />
      <TextField source="url" />
      <TextField source="circuitLayout" />
      <ReferenceField source="seasonId" reference="Season">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="circuitId" reference="Circuit">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
