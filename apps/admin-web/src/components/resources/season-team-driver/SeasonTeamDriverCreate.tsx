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

export const SeasonTeamDriverCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="number" validate={required()} />
      <TextInput source="code" validate={required()} />
      <BooleanInput source="isTemporary" validate={required()} />
      <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="driverId" reference="Driver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);