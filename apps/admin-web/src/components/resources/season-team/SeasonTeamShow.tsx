import { TextField, ReferenceField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const SeasonTeamShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="shortName" />
      <TextField source="powerUnit" />
      <TextField source="chassis" />
      <ReferenceField source="seasonId" reference="Season">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="teamId" reference="Team">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
