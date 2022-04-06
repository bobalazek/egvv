import { Create, SimpleForm, TextInput, required, CreateProps } from 'react-admin';

export const VehicleCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="powerUnit" validate={required()} />
      <TextInput source="modelUrl" validate={required()} />
      <TextInput source="note" />
    </SimpleForm>
  </Create>
);
