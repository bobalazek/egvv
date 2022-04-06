import {
  required,
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceInput,
  AutocompleteInput,
  CreateProps,
} from 'react-admin';

export const SeasonCreate = (props: CreateProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryParams = new URLSearchParams((props as any).location.search);
  const seriesId = queryParams.get('seriesId');
  const redirect = seriesId ? `/Series/${seriesId}/show/seasons` : false;

  return (
    <Create {...props}>
      <SimpleForm redirect={redirect}>
        <TextInput source="slug" validate={required()} />
        <TextInput source="name" validate={required()} />
        <TextInput source="year" validate={required()} />
        <DateInput source="startAt" validate={required()} />
        <DateInput source="endAt" />
        <ReferenceInput source="seriesId" reference="Series" defaultValue={seriesId} validate={required()}>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
