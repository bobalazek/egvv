import { TextField, ReferenceField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const EventSessionTeamDriverPitStopShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="lap" />
      <TextField source="timeMilliseconds" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
