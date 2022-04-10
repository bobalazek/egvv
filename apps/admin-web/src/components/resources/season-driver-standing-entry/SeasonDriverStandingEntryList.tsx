import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  DateField,
  ShowButton,
  EditButton,
  DeleteButton,
  ListProps,
  TextInput,
} from 'react-admin';

export const SeasonDriverStandingEntryList = (props: ListProps) => (
  <List
    sort={{
      field: 'points',
      order: 'asc',
    }}
    filters={[<TextInput label="Search" source="q" alwaysOn />]}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="seasonDriverId" reference="SeasonDriver">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="points" />
      <DateField source="dateAt" />
      <TextField source="note" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
