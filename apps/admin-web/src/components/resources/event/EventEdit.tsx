import { SimpleForm, TextInput, required, ReferenceInput, AutocompleteInput, Edit, EditProps } from 'react-admin';

export const EventEdit = (props: EditProps) => (
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
