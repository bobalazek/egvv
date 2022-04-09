import { TextField, BooleanField, ReferenceField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const SeasonDriverShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="nameWithSeason" />
      </ReferenceField>
      <ReferenceField source="driverId" reference="Driver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="number" />
      <TextField source="code" />
      <BooleanField source="isTemporary" />
    </SimpleShowLayout>
  </Show>
);
