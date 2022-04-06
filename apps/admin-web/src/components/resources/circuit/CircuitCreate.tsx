import { Create, SimpleForm, TextInput, required, CreateProps } from 'react-admin';

export const CircuitCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="location" validate={required()} />
      <TextInput source="locationLatitude" />
      <TextInput source="locationLongitude" />
      <TextInput source="countryCode" validate={required()} />
      <TextInput source="url" validate={required()} />
    </SimpleForm>
  </Create>
);
