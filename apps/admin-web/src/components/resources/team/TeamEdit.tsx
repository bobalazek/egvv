import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  DateInput,
  ReferenceInput,
  AutocompleteInput,
  EditProps,
} from 'react-admin';

export const TeamEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
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
  </Edit>
);
