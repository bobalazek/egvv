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

import { FilterInput } from '../../inputs/FilterInput';

export const SeasonTeamStandingEntryCreate = (props: CreateProps) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
          <AutocompleteInput optionText="nameWithSeason" />
        </ReferenceInput>
        <FilterInput source="eventSessionId" reference="EventSession" filterId="seasonTeamId" />
        <NumberInput source="points" validate={required()} />
        <DateInput source="dateAt" validate={required()} helperText="When were the points awarded?" />
        <TextInput source="note" multiline />
      </SimpleForm>
    </Create>
  );
};
