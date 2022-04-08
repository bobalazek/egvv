import { SimpleForm, Edit, TextInput, ReferenceInput, AutocompleteInput, required, EditProps } from 'react-admin';

export const EventSessionDriverStartingGridEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="position" />
      <TextInput source="time" />
      <TextInput source="note" />
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
