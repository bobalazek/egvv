import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  BooleanInput,
  EditProps,
} from 'react-admin';

export const SeasonDriverEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="number" validate={required()} />
      <TextInput source="code" validate={required()} />
      <BooleanInput source="isTemporary" validate={required()} />
      <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
        <AutocompleteInput optionText="nameWithSeason" />
      </ReferenceInput>
      <ReferenceInput source="driverId" reference="Driver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
