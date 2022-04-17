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

export const EventSessionCreate = (props: CreateProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryParams = new URLSearchParams((props as any).location.search);
  const eventId = queryParams.get('eventId');
  const redirect = eventId ? `/Event/${eventId}/show/seasons` : false;

  return (
    <Create {...props}>
      <SimpleForm redirect={redirect}>
        <ReferenceInput source="eventId" reference="Event" defaultValue={eventId}>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <TextInput source="slug" validate={required()} />
        <TextInput source="name" validate={required()} />
        <TextInput source="type" validate={required()} />
        <DateTimeInput source="startAt" validate={required()} />
        <DateTimeInput source="endAt" />
      </SimpleForm>
    </Create>
  );
};
