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
import { useFormState } from 'react-final-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeasonTeamStandingEntryCreateEventSessionInput = (props: any) => {
  const { values } = useFormState();

  const filter: { [key: string]: string } = {};
  if (values.seasonTeamId) {
    filter['seasonTeamId'] = values.seasonTeamId;
  }

  return (
    <ReferenceInput disabled={!values.seasonTeamId} filter={filter} {...props}>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  );
};

export const SeasonTeamStandingEntryCreate = (props: CreateProps) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()}>
          <AutocompleteInput optionText="nameWithSeason" />
        </ReferenceInput>
        <SeasonTeamStandingEntryCreateEventSessionInput
          source="eventSessionId"
          reference="EventSession"
          validate={required()}
        />
        <NumberInput source="points" validate={required()} />
        <DateInput source="dateAt" validate={required()} />
        <TextInput source="note" multiline />
      </SimpleForm>
    </Create>
  );
};
