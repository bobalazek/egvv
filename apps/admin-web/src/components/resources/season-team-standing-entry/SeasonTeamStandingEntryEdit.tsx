import {
  SimpleForm,
  TextInput,
  required,
  DateInput,
  ReferenceInput,
  AutocompleteInput,
  Edit,
  NumberInput,
  EditProps,
} from 'react-admin';

import { FilterInput } from '../../inputs/FilterInput';

export const SeasonTeamStandingEntryEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
        <AutocompleteInput optionText="nameWithSeason" />
      </ReferenceInput>
      <FilterInput source="eventSessionId" reference="EventSession" filterId="seasonTeamId" />
      <NumberInput source="points" validate={required()} />
      <DateInput source="dateAt" validate={required()} helperText="When were the points awarded?" />
      <TextInput source="note" multiline />
    </SimpleForm>
  </Edit>
);
