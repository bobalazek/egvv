import { TextField, ReferenceField, DateField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const SeasonTeamDriverStandingEntryShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="points" />
      <DateField source="dateAt" />
      <TextField source="note" />
      <ReferenceField source="seasonTeamDriverId" reference="SeasonTeamDriver">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
