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

export const EventSessionTeamDriverLapCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="lap" validate={required()} />
      <BooleanInput source="isDeleted" validate={required()} />
      <DateTimeInput source="time" />
      <TextInput source="position" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
