import { TextField, ReferenceField, DateField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const SeasonTeamStandingEntryShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="points" />
      <DateField source="dateAt" />
      <TextField source="note" />
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
