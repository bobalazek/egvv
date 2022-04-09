import { SimpleForm, TextInput, required, Edit, EditProps } from 'react-admin';

export const CircuitEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="location" validate={required()} />
      <TextInput source="locationLatitude" />
      <TextInput source="locationLongitude" />
      <TextInput source="countryCode" validate={required()} />
      <TextInput source="timezone" validate={required()} />
      <TextInput source="url" validate={required()} />
    </SimpleForm>
  </Edit>
);
