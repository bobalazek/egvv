import { TextField, DateField, ReferenceField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const EventSessionDriverStartingGridShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField source="eventSessionDriverId" reference="EventSessionDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="position" />
      <DateField source="time" />
      <TextField source="note" />
    </SimpleShowLayout>
  </Show>
);
