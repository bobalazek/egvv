import { Create, SimpleForm, TextInput, ReferenceInput, AutocompleteInput, required, CreateProps } from 'react-admin';

export const EventSessionTeamDriverClassificationCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="status" validate={required()} />
      <TextInput source="position" />
      <TextInput source="time" />
      <TextInput source="points" />
      <TextInput source="note" />
      <ReferenceInput source="eventSessionTeamDriverId" reference="EventSessionTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
