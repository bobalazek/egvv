import { TextField, DateField, ReferenceField, NumberField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const EventSessionTeamDriverClassificationShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="status" />
      <TextField source="position" />
      <DateField source="time" />
      <NumberField source="points" />
      <TextField source="note" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
