import { List, Datagrid, TextField, ResourceComponentProps, BooleanField, ReferenceField } from 'react-admin';

export const SeasonTeamDriverList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'code',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="number" />
      <TextField source="code" />
      <BooleanField source="isTemporary" />
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="driverId" reference="Driver">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
