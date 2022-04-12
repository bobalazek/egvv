import { TextField, DateField, ReferenceField, NumberField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const EventSessionDriverClassificationShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField source="eventSessionDriverId" reference="EventSessionDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="status" />
      <TextField source="position" />
      <DateField source="time" />
      <TextField source="laps" />
      <TextField source="lapsBehind" />
      <NumberField source="points" />
      <TextField source="note" />
    </SimpleShowLayout>
  </Show>
);
