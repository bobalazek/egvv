import { TextField, ReferenceField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const EventSessionDriverPitStopShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField source="eventSessionDriverId" reference="EventSessionDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="lap" />
      <TextField source="timeMilliseconds" />
    </SimpleShowLayout>
  </Show>
);
