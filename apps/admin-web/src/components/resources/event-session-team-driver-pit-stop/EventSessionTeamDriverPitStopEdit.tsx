import { SimpleForm, required, TextInput, ReferenceInput, AutocompleteInput, Edit, EditProps } from 'react-admin';

export const EventSessionTeamDriverPitStopEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="lap" validate={required()} />
      <TextInput source="timeMilliseconds" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
