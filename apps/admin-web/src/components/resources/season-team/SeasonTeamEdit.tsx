import { SimpleForm, TextInput, required, ReferenceInput, Edit, AutocompleteInput, EditProps } from 'react-admin';

export const SeasonTeamEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
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
  </Edit>
);
