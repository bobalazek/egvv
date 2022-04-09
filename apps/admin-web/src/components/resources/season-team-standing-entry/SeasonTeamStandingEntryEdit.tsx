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
import { SeasonTeamStandingEntrySessionTeamInput } from './SeasonTeamStandingEntrySessionTeamInput';

export const SeasonTeamStandingEntryEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
        <AutocompleteInput optionText="nameWithSeason" />
      </ReferenceInput>
      <SeasonTeamStandingEntrySessionTeamInput source="eventSessionId" reference="EventSession" />
      <NumberInput source="points" validate={required()} />
      <DateInput source="dateAt" validate={required()} helperText="When were the points awarded?" />
      <TextInput source="note" multiline />
    </SimpleForm>
  </Edit>
);
