import {
  Create,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  CreateProps,
  DateTimeInput,
} from 'react-admin';

export const EventCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="fullName" validate={required()} />
      <TextInput source="round" validate={required()} />
      <TextInput source="laps" validate={required()} />
      <TextInput source="lapDistance" validate={required()} />
      <DateTimeInput source="raceAt" validate={required()} />
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
