import { Create, SimpleForm, required, TextInput, CreateProps } from 'react-admin';

export const DriverCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="countryCode" validate={required()} />
      <TextInput source="url" validate={required()} />
    </SimpleForm>
  </Create>
);
