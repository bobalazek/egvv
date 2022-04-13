import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  CreateProps,
  NumberInput,
} from 'react-admin';

export const EventSessionDriverLapCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="lap" validate={required()} />
      <BooleanInput source="isDeleted" validate={required()} />
      <NumberInput source="timeMilliseconds" />
      <TextInput source="position" />
    </SimpleForm>
  </Create>
);
