import { Create, SimpleForm, TextInput, ReferenceInput, AutocompleteInput, required, CreateProps } from 'react-admin';

export const EventSessionDriverClassificationCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="status" validate={required()} />
      <TextInput source="position" />
      <TextInput source="time" />
      <TextInput source="points" />
      <TextInput source="note" />
    </SimpleForm>
  </Create>
);
