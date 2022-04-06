import { SimpleForm, TextInput, required, Create, CreateProps } from 'react-admin';

export const SeriesCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="url" validate={required()} />
    </SimpleForm>
  </Create>
);
