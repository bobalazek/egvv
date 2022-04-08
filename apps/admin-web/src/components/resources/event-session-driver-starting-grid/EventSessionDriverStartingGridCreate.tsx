import { Create, SimpleForm, TextInput, ReferenceInput, AutocompleteInput, required, CreateProps } from 'react-admin';

export const EventSessionDriverStartingGridCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="position" />
      <TextInput source="time" />
      <TextInput source="note" />
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
