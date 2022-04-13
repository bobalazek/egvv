import { Create, SimpleForm, required, TextInput, ReferenceInput, AutocompleteInput, CreateProps, NumberInput } from 'react-admin';

export const EventSessionDriverPitStopCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="lap" validate={required()} />
      <NumberInput source="stopTimeMilliseconds" />
      <NumberInput source="timeMilliseconds" />
    </SimpleForm>
  </Create>
);
