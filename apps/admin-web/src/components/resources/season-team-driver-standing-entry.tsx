import { List, Datagrid, TextField, ResourceComponentProps, ReferenceField, DateField } from 'react-admin';

export const SeasonTeamDriverStandingEntryList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'points',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="points" />
      <DateField source="dateAt" />
      <TextField source="note" />
      <ReferenceField source="seasonTeamDriverId" reference="SeasonTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
