import { SimpleForm, required, TextInput, ReferenceInput, AutocompleteInput, Edit, EditProps } from 'react-admin';

export const EventSessionTeamDriverEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput
        source="number"
        validate={required()}
        helperText="Enter a value only if it is different from the drivers default number"
      />
      <ReferenceInput source="eventSessionId" reference="EventSession" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="seasonTeamDriverId" reference="SeasonTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
