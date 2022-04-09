import {
  SimpleForm,
  Create,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  BooleanInput,
  CreateProps,
} from 'react-admin';

export const SeasonDriverCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
        <AutocompleteInput optionText="nameWithSeason" />
      </ReferenceInput>
      <ReferenceInput source="driverId" reference="Driver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="number" validate={required()} />
      <TextInput source="code" validate={required()} />
      <BooleanInput source="isTemporary" validate={required()} />
    </SimpleForm>
  </Create>
);
