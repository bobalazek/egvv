import {
  List,
  Datagrid,
  TextField,
  ResourceComponentProps,
  BooleanField,
  ReferenceField,
  ShowButton,
  EditButton,
  DeleteButton,
  Show,
  SimpleShowLayout,
  Create,
  SimpleForm,
  TextInput,
  required,
  BooleanInput,
  ReferenceInput,
  Edit,
  AutocompleteInput,
} from 'react-admin';

export const SeasonTeamList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'name',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="shortName" />
      <TextField source="powerUnit" />
      <TextField source="chassis" />
      <BooleanField source="isDefunct" />
      <ReferenceField source="seasonId" reference="Season">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="teamId" reference="Team">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const SeasonTeamShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="shortName" />
      <TextField source="powerUnit" />
      <TextField source="chassis" />
      <BooleanField source="isDefunct" />
      <ReferenceField source="seasonId" reference="Season">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="teamId" reference="Team">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export const SeasonTeamCreate = (props: ResourceComponentProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput source="shortName" validate={required()} />
      <TextInput source="powerUnit" validate={required()} />
      <TextInput source="chassis" validate={required()} />
      <BooleanInput source="isDefunct" validate={required()} />
      <ReferenceInput source="seasonId" reference="Season">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="teamId" reference="Team">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const SeasonTeamEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" validate={required()} />
      <TextInput source="shortName" validate={required()} />
      <TextInput source="powerUnit" validate={required()} />
      <TextInput source="chassis" validate={required()} />
      <BooleanInput source="isDefunct" validate={required()} />
      <ReferenceInput source="seasonId" reference="Season">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="teamId" reference="Team">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
