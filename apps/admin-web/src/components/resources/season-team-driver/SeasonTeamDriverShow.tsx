import { TextField, BooleanField, ReferenceField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const SeasonTeamDriverShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="number" />
      <TextField source="code" />
      <BooleanField source="isTemporary" />
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="driverId" reference="Driver">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
