import { Create, SimpleForm, required, TextInput, ReferenceInput, AutocompleteInput, CreateProps } from 'react-admin';

export const EventSessionTeamDriverCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="number" validate={required()} />
      <TextInput source="code" validate={required()} />
      <ReferenceInput source="eventSessionId" reference="EventSession" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="seasonTeamDriverId" reference="SeasonTeamDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
