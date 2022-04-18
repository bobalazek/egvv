import { TextField, ReferenceField, Show, SimpleShowLayout, ShowProps, NumberField } from 'react-admin';

export const EventSessionDriverStartingGridShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField source="eventSessionDriverId" reference="EventSessionDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="position" />
      <NumberField source="timeMilliseconds" />
      <TextField source="tyres" />
      <TextField source="note" />
    </SimpleShowLayout>
  </Show>
);
