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
  Create,
  DeleteButton,
  ReferenceManyField,
} from 'react-admin';

export const SeriesList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'name',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="url" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
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
      <ReferenceManyField
        target="seriesId"
        reference="Season"
        label="Seasons"
        sort={{
          field: 'startAt',
          order: 'desc',
        }}
        perPage={9999}
      >
        <Datagrid>
          <TextField source="name" />
          <TextField source="year" />
          <TextField source="startAt" />
          <TextField source="endAt" />
          <ShowButton />
          <EditButton />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);

export const SeriesCreate = (props: ResourceComponentProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="url" validate={required()} />
    </SimpleForm>
  </Create>
);

export const SeriesEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="url" validate={required()} />
    </SimpleForm>
  </Edit>
);
