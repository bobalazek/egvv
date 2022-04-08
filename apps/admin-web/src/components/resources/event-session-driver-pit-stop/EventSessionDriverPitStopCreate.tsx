import { Create, SimpleForm, required, TextInput, ReferenceInput, AutocompleteInput, CreateProps } from 'react-admin';

export const EventSessionDriverPitStopCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="lap" validate={required()} />
      <TextInput source="timeMilliseconds" />
    </SimpleForm>
  </Create>
);
