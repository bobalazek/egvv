import { TextField, ReferenceField, DateField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const SeasonTeamStandingEntryShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="nameWithSeason" />
      </ReferenceField>
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="points" />
      <DateField source="dateAt" />
      <TextField source="note" />
    </SimpleShowLayout>
  </Show>
);
