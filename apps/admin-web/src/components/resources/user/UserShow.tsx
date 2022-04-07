import { TextField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

export const UserShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="username" />
      <TextField source="email" />
      <TextField source="roles" />
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);
