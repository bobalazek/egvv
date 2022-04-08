import { Create, SimpleForm, required, TextInput, ReferenceInput, AutocompleteInput, CreateProps } from 'react-admin';

export const EventSessionTeamDriverCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="eventSessionId" reference="EventSession" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="seasonTeamDriverId" reference="SeasonTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="number" helperText="Enter a value only if it is different from the drivers default number" />
    </SimpleForm>
  </Create>
);
