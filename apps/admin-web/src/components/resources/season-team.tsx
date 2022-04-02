import { List, Datagrid, TextField, ResourceComponentProps, BooleanField, ReferenceField } from 'react-admin';

export const SeasonTeamList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
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
    </Datagrid>
  </List>
);
