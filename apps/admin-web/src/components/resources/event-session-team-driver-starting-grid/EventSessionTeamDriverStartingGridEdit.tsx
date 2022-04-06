import { SimpleForm, Edit, TextInput, ReferenceInput, AutocompleteInput, required, EditProps } from 'react-admin';

export const EventSessionTeamDriverStartingGridEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="position" />
      <TextInput source="time" />
      <TextInput source="note" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
