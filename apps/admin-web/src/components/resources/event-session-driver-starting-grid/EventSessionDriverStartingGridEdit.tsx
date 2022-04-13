import {
  SimpleForm,
  Edit,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  EditProps,
  NumberInput,
} from 'react-admin';

export const EventSessionDriverStartingGridEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="position" />
      <NumberInput source="timeMilliseconds" />
      <TextInput source="note" multiline />
    </SimpleForm>
  </Edit>
);
