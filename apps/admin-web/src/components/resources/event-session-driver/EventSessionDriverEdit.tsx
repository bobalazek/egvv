import { SimpleForm, required, TextInput, ReferenceInput, AutocompleteInput, Edit, EditProps } from 'react-admin';

export const EventSessionDriverEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput source="eventSessionId" reference="EventSession" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="seasonDriverId" reference="SeasonDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="number" helperText="Enter a value only if it is different from the drivers default number" />
    </SimpleForm>
  </Edit>
);
