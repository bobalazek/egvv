import { List, Datagrid, TextField, ResourceComponentProps, ReferenceField, DateField } from 'react-admin';

export const SeasonTeamStandingEntryList = (props: ResourceComponentProps) => (
  <List {...props}>
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
