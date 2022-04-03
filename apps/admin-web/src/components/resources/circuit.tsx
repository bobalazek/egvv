import {
  List,
  Datagrid,
  TextField,
  ResourceComponentProps,
  Show,
  SimpleShowLayout,
  Create,
  SimpleForm,
  TextInput,
  required,
  Edit,
  ShowButton,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const CircuitList = (props: ResourceComponentProps) => (
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
      <TextField source="location" />
      <TextField source="locationLatitude" />
      <TextField source="locationLongitude" />
      <TextField source="countryCode" />
      <TextField source="url" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const CircuitShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="location" />
      <TextField source="locationLatitude" />
      <TextField source="locationLongitude" />
      <TextField source="countryCode" />
      <TextField source="url" />
    </SimpleShowLayout>
  </Show>
);

export const CircuitCreate = (props: ResourceComponentProps) => (
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

export const CircuitEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="location" validate={required()} />
      <TextInput source="locationLatitude" />
      <TextInput source="locationLongitude" />
      <TextInput source="countryCode" validate={required()} />
      <TextInput source="url" validate={required()} />
    </SimpleForm>
  </Edit>
);
