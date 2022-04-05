import {
  List,
  Datagrid,
  TextField,
  ResourceComponentProps,
  DateField,
  ReferenceField,
  ShowButton,
  EditButton,
  DeleteButton,
  Create,
  Show,
  SimpleShowLayout,
  SimpleForm,
  Edit,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  required,
} from 'react-admin';

export const EventSessionTeamDriverStartingGridList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'position',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="position" />
      <DateField source="time" />
      <TextField source="note" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const EventSessionTeamDriverStartingGridShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="position" />
      <DateField source="time" />
      <TextField source="note" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export const EventSessionTeamDriverStartingGridCreate = (props: ResourceComponentProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="position" />
      <TextInput source="time" />
      <TextInput source="note" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const EventSessionTeamDriverStartingGridEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="position" />
      <TextInput source="time" />
      <TextInput source="note" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
