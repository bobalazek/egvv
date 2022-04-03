import { List, Datagrid, TextField, ResourceComponentProps, ReferenceField, DateField } from 'react-admin';

export const SeasonTeamStandingEntryList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'dateAt',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="points" />
      <DateField source="dateAt" />
      <TextField source="note" />
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
