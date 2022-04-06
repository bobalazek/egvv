import { TextField, DateField, ReferenceField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const EventSessionShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="type" />
      <DateField source="startAt" showTime={true} />
      <DateField source="endAt" showTime={true} />
      <ReferenceField source="eventId" reference="Event">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
