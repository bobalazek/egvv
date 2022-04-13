import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  Edit,
  required,
  EditProps,
  NumberInput,
} from 'react-admin';

export const EventSessionDriverClassificationEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="status" validate={required()} />
      <TextInput source="position" />
      <NumberInput source="timeMilliseconds" />
      <TextInput source="laps" />
      <TextInput source="lapsBehind" />
      <TextInput source="points" />
      <TextInput source="note" multiline />
    </SimpleForm>
  </Edit>
);
