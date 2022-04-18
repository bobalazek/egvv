import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  CreateProps,
  NumberInput,
} from 'react-admin';

export const EventSessionDriverStartingGridCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="position" />
      <NumberInput source="timeMilliseconds" />
      <TextInput source="tyres" />
      <TextInput source="note" multiline />
    </SimpleForm>
  </Create>
);
