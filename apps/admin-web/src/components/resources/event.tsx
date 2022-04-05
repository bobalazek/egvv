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
  Show,
  SimpleShowLayout,
  Create,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  Edit,
  ReferenceManyField,
} from 'react-admin';

export const EventList = (props: ResourceComponentProps) => (
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
      <TextField source="round" />
      <TextField source="laps" />
      <TextField source="lapDistance" />
      <DateField source="raceAt" showTime={true} />
      <TextField source="url" />
      <TextField source="circuitLayout" />
      <ReferenceField source="seasonId" reference="Season">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="circuitId" reference="Circuit">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const EventShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="round" />
      <TextField source="laps" />
      <TextField source="lapDistance" />
      <DateField source="raceAt" showTime={true} />
      <TextField source="url" />
      <TextField source="circuitLayout" />
      <ReferenceField source="seasonId" reference="Season">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="circuitId" reference="Circuit">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceManyField
        target="eventId"
        reference="EventSession"
        label="Event Sessions"
        sort={{
          field: 'startAt',
          order: 'asc',
        }}
      >
        <Datagrid>
          <TextField source="name" />
          <TextField source="startAt" />
          <TextField source="endAt" />
          <ShowButton />
          <EditButton />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);

export const EventCreate = (props: ResourceComponentProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="round" validate={required()} />
      <TextInput source="laps" validate={required()} />
      <TextInput source="lapDistance" validate={required()} />
      <TextInput source="raceAt" validate={required()} />
      <TextInput source="url" validate={required()} />
      <TextInput source="circuitLayout" />
      <ReferenceInput source="seasonId" reference="Season">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="circuitId" reference="Circuit">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const EventEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="round" validate={required()} />
      <TextInput source="laps" validate={required()} />
      <TextInput source="lapDistance" validate={required()} />
      <TextInput source="raceAt" validate={required()} />
      <TextInput source="url" validate={required()} />
      <TextInput source="circuitLayout" />
      <ReferenceInput source="seasonId" reference="Season">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="circuitId" reference="Circuit">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
