import { SimpleForm, TextInput, required, Edit, EditProps } from 'react-admin';

export const VehicleEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="powerUnit" validate={required()} />
      <TextInput source="modelUrl" validate={required()} />
      <TextInput source="note" />
    </SimpleForm>
  </Edit>
);
