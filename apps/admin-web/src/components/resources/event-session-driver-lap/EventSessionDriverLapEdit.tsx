import {
  SimpleForm,
  TextInput,
  BooleanInput,
  required,
  DateTimeInput,
  ReferenceInput,
  AutocompleteInput,
  Edit,
  EditProps,
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
      <DateTimeInput source="time" />
      <TextInput source="position" />
    </SimpleForm>
  </Edit>
);
