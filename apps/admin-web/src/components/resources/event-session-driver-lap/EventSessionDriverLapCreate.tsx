import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  required,
  DateTimeInput,
  ReferenceInput,
  AutocompleteInput,
  CreateProps,
} from 'react-admin';

export const EventSessionDriverLapCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="lap" validate={required()} />
      <BooleanInput source="isDeleted" validate={required()} />
      <DateTimeInput source="time" />
      <TextInput source="position" />
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
