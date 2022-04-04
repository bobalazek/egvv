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
  Edit,
  SimpleForm,
  Create,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  BooleanInput,
} from 'react-admin';

export const SeasonTeamDriverList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'code',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="number" />
      <TextField source="code" />
      <BooleanField source="isTemporary" />
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="driverId" reference="Driver">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const SeasonTeamDriverShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="number" />
      <TextField source="code" />
      <BooleanField source="isTemporary" />
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="driverId" reference="Driver">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export const SeasonTeamDriverCreate = (props: ResourceComponentProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="number" validate={required()} />
      <TextInput source="code" validate={required()} />
      <BooleanInput source="isTemporary" validate={required()} />
      <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="driverId" reference="Driver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const SeasonTeamDriverEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="number" validate={required()} />
      <TextInput source="code" validate={required()} />
      <BooleanInput source="isTemporary" validate={required()} />
      <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="driverId" reference="Driver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
