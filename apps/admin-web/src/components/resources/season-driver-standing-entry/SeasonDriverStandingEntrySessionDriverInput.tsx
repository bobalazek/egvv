import { ReferenceInput, AutocompleteInput } from 'react-admin';
import { useFormState } from 'react-final-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeasonDriverStandingEntrySessionDriverInput = (props: any) => {
  const { values } = useFormState();

  const filter: { [key: string]: string } = {};
  if (values.seasonDriverId) {
    filter['seasonDriverId'] = values.seasonDriverId;
  }

  return (
    <ReferenceInput disabled={!values.seasonDriverId} filter={filter} {...props}>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  );
};
