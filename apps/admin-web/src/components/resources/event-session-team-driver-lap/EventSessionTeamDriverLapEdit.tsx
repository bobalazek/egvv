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

export const EventSessionTeamDriverLapEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="lap" validate={required()} />
      <BooleanInput source="isDeleted" validate={required()} />
      <DateTimeInput source="time" />
      <TextInput source="position" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
