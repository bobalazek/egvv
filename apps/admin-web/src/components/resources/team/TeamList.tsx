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

export const TeamList = (props: ListProps) => (
  <List
    sort={{
      field: 'name',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="location" />
      <TextField source="countryCode" />
      <TextField source="url" />
      <DateField source="debutAt" />
      <DateField source="defunctAt" />
      <ReferenceField source="predecessorTeamId" reference="Team">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
