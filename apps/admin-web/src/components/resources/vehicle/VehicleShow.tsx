import { TextField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const VehicleShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="powerUnit" />
      <TextField source="modelUrl" />
      <TextField source="note" />
    </SimpleShowLayout>
  </Show>
);
