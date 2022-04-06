import { Create, SimpleForm, required, TextInput, ReferenceInput, AutocompleteInput, CreateProps } from 'react-admin';

export const EventSessionTeamDriverPitStopCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="lap" validate={required()} />
      <TextInput source="timeMilliseconds" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
