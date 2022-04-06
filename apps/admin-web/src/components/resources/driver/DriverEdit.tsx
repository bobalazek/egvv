import { SimpleForm, required, TextInput, Edit, EditProps } from 'react-admin';

export const DriverEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="slug" validate={required()} />
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="countryCode" validate={required()} />
      <TextInput source="url" validate={required()} />
    </SimpleForm>
  </Edit>
);
