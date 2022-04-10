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

export const SeasonTeamStandingEntryList = (props: ListProps) => (
  <List
    sort={{
      field: 'dateAt',
      order: 'asc',
    }}
    filters={[<TextInput label="Search" source="q" alwaysOn />]}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="nameWithSeason" />
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
