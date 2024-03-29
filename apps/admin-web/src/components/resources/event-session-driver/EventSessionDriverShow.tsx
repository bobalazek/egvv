import { TextField, ReferenceField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const EventSessionDriverShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="seasonDriverId" reference="SeasonDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="number" />
    </SimpleShowLayout>
  </Show>
);
