import { TextField, DateField, Show, SimpleShowLayout, ReferenceField, ShowProps } from 'react-admin';

export const TeamShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="location" />
      <TextField source="countryCode" />
      <TextField source="url" />
      <DateField source="debutAt" />
      <DateField source="defunctAt" />
      <ReferenceField source="predecessorTeamId" reference="Team">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
