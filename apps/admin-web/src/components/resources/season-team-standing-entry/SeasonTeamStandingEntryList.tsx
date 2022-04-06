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
} from 'react-admin';

export const SeasonTeamStandingEntryList = (props: ListProps) => (
  <List
    sort={{
      field: 'dateAt',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="points" />
      <DateField source="dateAt" />
      <TextField source="note" />
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
