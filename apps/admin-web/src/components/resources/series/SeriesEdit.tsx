import { Edit, SimpleForm, TextInput, required, EditProps } from 'react-admin';

export const SeriesEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="url" validate={required()} />
    </SimpleForm>
  </Edit>
);
