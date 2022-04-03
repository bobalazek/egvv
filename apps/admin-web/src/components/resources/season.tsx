import {
  List,
  Datagrid,
  TextField,
  ResourceComponentProps,
  DateField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  required,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ShowButton,
  EditButton,
  DeleteButton,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

export const SeasonList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="year" />
      <DateField source="startAt" />
      <DateField source="endAt" />
      <ReferenceField source="seriesId" reference="Series">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const SeasonShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="year" />
      <DateField source="startAt" />
      <DateField source="endAt" />
      <ReferenceField source="seriesId" reference="Series">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export const SeasonCreate = (props: ResourceComponentProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="year" validate={required()} />
      <DateInput source="startAt" validate={required()} />
      <DateInput source="endAt" />
      <ReferenceInput source="seriesId" reference="Series">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const SeasonEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="year" validate={required()} />
      <DateInput source="startAt" validate={required()} />
      <DateInput source="endAt" />
      <ReferenceInput source="seriesId" reference="Series">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
