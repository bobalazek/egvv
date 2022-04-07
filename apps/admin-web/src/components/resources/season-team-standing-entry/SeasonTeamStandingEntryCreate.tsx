import {
  Create,
  SimpleForm,
  TextInput,
  required,
  DateInput,
  ReferenceInput,
  AutocompleteInput,
  NumberInput,
  CreateProps,
} from 'react-admin';

export const SeasonTeamStandingEntryCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput source="points" validate={required()} />
      <DateInput source="dateAt" validate={required()} />
      <TextInput source="note" />
      <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="eventSessionId" reference="EventSession" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);