import { TextField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const DriverShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="slug" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="countryCode" />
      <TextField source="url" />
    </SimpleShowLayout>
  </Show>
);
