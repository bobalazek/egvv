import {
  List,
  Datagrid,
  TextField,
  ResourceComponentProps,
  DateField,
  ReferenceField,
  NumberField,
  ShowButton,
  EditButton,
  DeleteButton,
  Show,
  SimpleShowLayout,
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  Edit,
  required,
} from 'react-admin';

export const EventSessionTeamDriverClassificationList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'position',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="status" />
      <TextField source="position" />
      <DateField source="time" />
      <NumberField source="points" />
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

export const EventSessionTeamDriverClassificationShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="status" />
      <TextField source="position" />
      <DateField source="time" />
      <NumberField source="points" />
      <TextField source="note" />
      <ReferenceField source="eventSessionTeamDriverId" reference="EventSessionTeamDriver">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export const EventSessionTeamDriverClassificationCreate = (props: ResourceComponentProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="status" validate={required()} />
      <TextInput source="position" />
      <TextInput source="time" />
      <TextInput source="points" />
      <TextInput source="note" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const EventSessionTeamDriverClassificationEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="status" validate={required()} />
      <TextInput source="position" />
      <TextInput source="time" />
      <TextInput source="points" />
      <TextInput source="note" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
