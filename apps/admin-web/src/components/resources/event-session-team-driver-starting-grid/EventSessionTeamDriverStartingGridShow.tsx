import { TextField, DateField, ReferenceField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const EventSessionTeamDriverStartingGridShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="position" />
      <DateField source="time" />
      <TextField source="note" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
