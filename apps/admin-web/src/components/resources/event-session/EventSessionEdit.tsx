import {
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  Edit,
  DateTimeInput,
  EditProps,
} from 'react-admin';

export const EventSessionEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput source="eventId" reference="Event">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="type" validate={required()} />
      <DateTimeInput source="startAt" validate={required()} />
      <DateTimeInput source="endAt" validate={required()} />
    </SimpleForm>
  </Edit>
);
