import { TextField, ReferenceField, Show, SimpleShowLayout, ShowProps, NumberField } from 'react-admin';

export const EventSessionDriverPitStopShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField source="eventSessionDriverId" reference="EventSessionDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="lap" />
      <NumberField source="stopTimeMilliseconds" />
      <NumberField source="timeMilliseconds" />
      <TextField source="tyres" />
    </SimpleShowLayout>
  </Show>
);
