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
  TextInput,
  required,
  DateInput,
  ReferenceInput,
  AutocompleteInput,
  Edit,
  NumberInput,
} from 'react-admin';

export const SeasonTeamStandingEntryList = (props: ResourceComponentProps) => (
  <List
    sort={{
      field: 'dateAt',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="points" />
      <DateField source="dateAt" />
      <TextField source="note" />
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const SeasonTeamStandingEntryShow = (props: ResourceComponentProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="points" />
      <DateField source="dateAt" />
      <TextField source="note" />
      <ReferenceField source="seasonTeamId" reference="SeasonTeam">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export const SeasonTeamStandingEntryCreate = (props: ResourceComponentProps) => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput source="points" validate={required()} />
      <DateInput source="dateAt" validate={required()} />
      <TextInput source="note" />
      <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="eventSessionId" reference="EventSession" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const SeasonTeamStandingEntryEdit = (props: ResourceComponentProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <NumberInput source="points" validate={required()} />
      <DateInput source="dateAt" validate={required()} />
      <TextInput source="note" />
      <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="eventSessionId" reference="EventSession" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
