import {
  SimpleForm,
  Create,
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  BooleanInput,
  CreateProps,
} from 'react-admin';

export const SeasonDriverCreate = (props: CreateProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryParams = new URLSearchParams((props as any).location.search);
  const seasonTeamId = queryParams.get('seasonTeamId');
  const redirect = seasonTeamId ? `/SeasonTeam/${seasonTeamId}/show/drivers` : false;

  return (
    <Create {...props}>
      <SimpleForm redirect={redirect}>
        <ReferenceInput source="seasonTeamId" reference="SeasonTeam" validate={required()} defaultValue={seasonTeamId}>
          <AutocompleteInput optionText="nameWithSeason" />
        </ReferenceInput>
        <ReferenceInput source="driverId" reference="Driver" validate={required()}>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <TextInput source="number" validate={required()} />
        <TextInput source="code" validate={required()} />
        <BooleanInput source="isTemporary" validate={required()} />
      </SimpleForm>
    </Create>
  );
};
