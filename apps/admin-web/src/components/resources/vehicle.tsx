import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  DeleteButton,
  Show,
  SimpleShowLayout,
  Create,
  SimpleForm,
  TextInput,
  required,
  Edit,
  ListProps,
  ShowProps,
  CreateProps,
  EditProps,
} from 'react-admin';

export const VehicleList = (props: ListProps) => (
  <List
    sort={{
      field: 'name',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="powerUnit" />
      <TextField source="modelUrl" />
      <TextField source="note" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const VehicleShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="powerUnit" />
      <TextField source="modelUrl" />
      <TextField source="note" />
    </SimpleShowLayout>
  </Show>
);

export const VehicleCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="powerUnit" validate={required()} />
      <TextInput source="modelUrl" validate={required()} />
      <TextInput source="note" />
    </SimpleForm>
  </Create>
);

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
