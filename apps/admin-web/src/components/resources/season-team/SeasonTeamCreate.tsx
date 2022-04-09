import { Create, SimpleForm, TextInput, required, ReferenceInput, AutocompleteInput, CreateProps } from 'react-admin';

export const SeasonTeamCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput source="shortName" validate={required()} />
      <TextInput source="powerUnit" validate={required()} />
      <TextInput source="chassis" validate={required()} />
      <ReferenceInput source="seasonId" reference="Season" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="teamId" reference="Team" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
