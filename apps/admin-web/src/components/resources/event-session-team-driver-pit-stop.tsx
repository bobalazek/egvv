import {
  List,
  Datagrid,
  TextField,
  ResourceComponentProps,
  ReferenceField,
  ShowButton,
  EditButton,
  DeleteButton,
  Show,
  SimpleShowLayout,
  Create,
  SimpleForm,
  required,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  Edit,
} from 'react-admin';

export const EventSessionTeamDriverPitStopList = (props: ResourceComponentProps) => (
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
      <TextField source="timeMilliseconds" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const EventSessionTeamDriverPitStopShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="lap" />
      <TextField source="timeMilliseconds" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export const EventSessionTeamDriverPitStopCreate = (props: ResourceComponentProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="lap" validate={required()} />
      <TextInput source="timeMilliseconds" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const EventSessionTeamDriverPitStopEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="lap" validate={required()} />
      <TextInput source="timeMilliseconds" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
