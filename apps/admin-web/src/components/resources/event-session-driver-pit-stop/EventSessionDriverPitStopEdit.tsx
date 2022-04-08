import { SimpleForm, required, TextInput, ReferenceInput, AutocompleteInput, Edit, EditProps } from 'react-admin';

export const EventSessionDriverPitStopEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="lap" validate={required()} />
      <TextInput source="timeMilliseconds" />
    </SimpleForm>
  </Edit>
);
