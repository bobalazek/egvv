import { ReferenceInput, AutocompleteInput } from 'react-admin';
import { useFormState } from 'react-final-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FilterInput = (props: any) => {
  const { values } = useFormState();

  const filterId = props.filterId ?? false;

  const filter: { [key: string]: string } = {};
  if (filterId && values[filterId]) {
    filter[filterId] = values[filterId];
  }

  return (
    <ReferenceInput disabled={filterId && !values[filterId]} filter={filter} {...props}>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  );
};
