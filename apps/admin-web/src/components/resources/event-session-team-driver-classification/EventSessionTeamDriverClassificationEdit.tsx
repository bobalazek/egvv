import { SimpleForm, TextInput, ReferenceInput, AutocompleteInput, Edit, required, EditProps } from 'react-admin';

export const EventSessionTeamDriverClassificationEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="status" validate={required()} />
      <TextInput source="position" />
      <TextInput source="time" />
      <TextInput source="points" />
      <TextInput source="note" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
