import {
  Create,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  DateTimeInput,
  CreateProps,
} from 'react-admin';

export const EventSessionCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="type" validate={required()} />
      <DateTimeInput source="startAt" validate={required()} />
      <DateTimeInput source="endAt" validate={required()} />
      <ReferenceInput source="eventId" reference="Event">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
