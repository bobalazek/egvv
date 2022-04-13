import {
  SimpleForm,
  TextInput,
  BooleanInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  Edit,
  EditProps,
  NumberInput,
} from 'react-admin';

export const EventSessionDriverLapEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="lap" validate={required()} />
      <BooleanInput source="isDeleted" validate={required()} />
      <NumberInput source="timeMilliseconds" />
      <TextInput source="position" />
    </SimpleForm>
  </Edit>
);
