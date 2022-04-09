import { ReferenceInput, AutocompleteInput } from 'react-admin';
import { useFormState } from 'react-final-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeasonTeamStandingEntrySessionTeamInput = (props: any) => {
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
