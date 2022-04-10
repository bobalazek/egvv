import { Create, SimpleForm, TextInput, required, ReferenceInput, AutocompleteInput, CreateProps } from 'react-admin';

export const SeasonTeamCreate = (props: CreateProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryParams = new URLSearchParams((props as any).location.search);
  const seasonId = queryParams.get('seasonId');
  const redirect = seasonId ? `/Season/${seasonId}/show/teams` : false;

  return (
    <Create {...props}>
      <SimpleForm redirect={redirect}>
        <ReferenceInput source="seasonId" reference="Season" validate={required()} defaultValue={seasonId}>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="teamId" reference="Team" validate={required()}>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <TextInput source="name" validate={required()} />
        <TextInput source="shortName" validate={required()} />
        <TextInput source="powerUnit" validate={required()} />
        <TextInput source="chassis" validate={required()} />
      </SimpleForm>
    </Create>
  );
};
