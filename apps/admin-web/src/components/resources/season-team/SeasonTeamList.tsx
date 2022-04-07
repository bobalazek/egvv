import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  ReferenceField,
  ShowButton,
  EditButton,
  DeleteButton,
  ListProps,
} from 'react-admin';

export const SeasonTeamList = (props: ListProps) => (
  <List
    sort={{
      field: 'name',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="name" />
      <TextField source="shortName" />
      <TextField source="powerUnit" />
      <TextField source="chassis" />
      <BooleanField source="isDefunct" />
      <ReferenceField source="seasonId" reference="Season">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="teamId" reference="Team">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);