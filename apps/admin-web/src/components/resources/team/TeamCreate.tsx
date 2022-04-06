import {
  Create,
  SimpleForm,
  TextInput,
  required,
  DateInput,
  ReferenceInput,
  AutocompleteInput,
  CreateProps,
} from 'react-admin';

export const TeamCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="location" validate={required()} />
      <TextInput source="countryCode" validate={required()} />
      <TextInput source="url" validate={required()} />
      <DateInput source="debutAt" validate={required()} />
      <DateInput source="defunctAt" />
      <ReferenceInput source="predecessorTeamId" reference="Team">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
