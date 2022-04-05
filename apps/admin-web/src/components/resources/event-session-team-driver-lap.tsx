import {
  List,
  Datagrid,
  TextField,
  ResourceComponentProps,
  DateField,
  ReferenceField,
  BooleanField,
  ShowButton,
  EditButton,
  DeleteButton,
  Show,
  SimpleShowLayout,
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  required,
  DateInput,
  DateTimeInput,
  ReferenceInput,
  AutocompleteInput,
  Edit,
} from 'react-admin';

export const EventSessionTeamDriverLapList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'lap',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="lap" />
      <BooleanField source="isDeleted" />
      <DateField source="time" />
      <TextField source="position" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const EventSessionTeamDriverLapShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="lap" />
      <BooleanField source="isDeleted" />
      <DateField source="time" />
      <TextField source="position" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export const EventSessionTeamDriverLapCreate = (props: ResourceComponentProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="lap" validate={required()} />
      <BooleanInput source="isDeleted" validate={required()} />
      <DateTimeInput source="time" />
      <TextInput source="position" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const EventSessionTeamDriverLapEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="lap" validate={required()} />
      <BooleanInput source="isDeleted" validate={required()} />
      <DateTimeInput source="time" />
      <TextInput source="position" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
