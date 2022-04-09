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

export const SeasonDriverList = (props: ListProps) => (
  <List
    sort={{
      field: 'code',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="nameWithSeason" />
      </ReferenceField>
      <ReferenceField source="driverId" reference="Driver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="number" />
      <TextField source="code" />
      <BooleanField source="isTemporary" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
