import { TextField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const CircuitShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="location" />
      <TextField source="locationLatitude" />
      <TextField source="locationLongitude" />
      <TextField source="countryCode" />
      <TextField source="timezone" />
      <TextField source="url" />
    </SimpleShowLayout>
  </Show>
);
