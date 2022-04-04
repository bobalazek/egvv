import {
  List,
  Datagrid,
  TextField,
  ResourceComponentProps,
  ReferenceField,
  DateField,
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
  DateInput,
  NumberInput,
} from 'react-admin';

export const SeasonTeamDriverStandingEntryList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'points',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="points" />
      <DateField source="dateAt" />
      <TextField source="note" />
      <ReferenceField source="seasonTeamDriverId" reference="SeasonTeamDriver">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const SeasonTeamDriverStandingEntryShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="points" />
      <DateField source="dateAt" />
      <TextField source="note" />
      <ReferenceField source="seasonTeamDriverId" reference="SeasonTeamDriver">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export const SeasonTeamDriverStandingEntryCreate = (props: ResourceComponentProps) => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput source="points" validate={required()} />
      <DateInput source="dateAt" validate={required()} />
      <TextInput source="note" />
      <ReferenceInput source="seasonTeamDriverId" reference="SeasonTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="eventSessionId" reference="EventSession" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const SeasonTeamDriverStandingEntryEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <NumberInput source="points" validate={required()} />
      <DateInput source="dateAt" validate={required()} />
      <TextInput source="note" />
      <ReferenceInput source="seasonTeamDriverId" reference="SeasonTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="eventSessionId" reference="EventSession" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
