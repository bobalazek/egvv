import {
  List,
  Datagrid,
  TextField,
  DateField,
  ResourceComponentProps,
  Show,
  SimpleShowLayout,
  Create,
  SimpleForm,
  TextInput,
  required,
  Edit,
  DateInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  ShowButton,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const TeamList = (props: ResourceComponentProps) => (
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
      <TextField source="countryCode" />
      <TextField source="url" />
      <DateField source="debutAt" />
      <DateField source="defunctAt" />
      <ReferenceField source="predecessorTeamId" reference="Team">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const TeamShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="location" />
      <TextField source="countryCode" />
      <TextField source="url" />
      <DateField source="debutAt" />
      <DateField source="defunctAt" />
      <ReferenceField source="predecessorTeamId" reference="Team">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export const TeamCreate = (props: ResourceComponentProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="location" validate={required()} />
      <TextInput source="countryCode" validate={required()} />
      <TextInput source="url" validate={required()} />
      <DateInput source="debutAt" validate={required()} />
      <DateInput source="defunctAt" />
      <ReferenceInput source="predecessorTeamId" reference="Team">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const TeamEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="location" validate={required()} />
      <TextInput source="countryCode" validate={required()} />
      <TextInput source="url" validate={required()} />
      <DateInput source="debutAt" validate={required()} />
      <DateInput source="defunctAt" />
      <ReferenceInput source="predecessorTeamId" reference="Team">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
