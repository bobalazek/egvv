import { TextField, ReferenceField, BooleanField, Show, SimpleShowLayout, ShowProps, NumberField } from 'react-admin';

export const EventSessionDriverLapShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField source="eventSessionDriverId" reference="EventSessionDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="lap" />
      <BooleanField source="isDeleted" />
      <NumberField source="timeMilliseconds" />
      <TextField source="position" />
    </SimpleShowLayout>
  </Show>
);
