import {
  List,
  Datagrid,
  TextField,
  ResourceComponentProps,
  Show,
  SimpleShowLayout,
  ShowButton,
  Edit,
  SimpleForm,
  TextInput,
  required,
  EditButton,
} from 'react-admin';

export const SeriesList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="url" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

export const SeriesShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="url" />
    </SimpleShowLayout>
  </Show>
);

export const SeriesEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="url" validate={required()} />
    </SimpleForm>
  </Edit>
);
