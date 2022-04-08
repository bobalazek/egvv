import { TextField, DateField, ReferenceField, BooleanField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const EventSessionDriverLapShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField source="eventSessionDriverId" reference="EventSessionDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="lap" />
      <BooleanField source="isDeleted" />
      <DateField source="time" />
      <TextField source="position" />
    </SimpleShowLayout>
  </Show>
);
