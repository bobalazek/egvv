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
import { SeasonTeamStandingEntrySessionTeamInput } from './SeasonTeamStandingEntrySessionTeamInput';

export const SeasonTeamStandingEntryCreate = (props: CreateProps) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
          <AutocompleteInput optionText="nameWithSeason" />
        </ReferenceInput>
        <SeasonTeamStandingEntrySessionTeamInput source="eventSessionId" reference="EventSession" />
        <NumberInput source="points" validate={required()} />
        <DateInput source="dateAt" validate={required()} helperText="When were the points awarded?" />
        <TextInput source="note" multiline />
      </SimpleForm>
    </Create>
  );
};
