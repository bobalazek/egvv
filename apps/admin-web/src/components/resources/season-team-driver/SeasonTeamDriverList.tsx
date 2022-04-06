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

export const SeasonTeamDriverList = (props: ListProps) => (
  <List
    sort={{
      field: 'code',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="number" />
      <TextField source="code" />
      <BooleanField source="isTemporary" />
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="driverId" reference="Driver">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
