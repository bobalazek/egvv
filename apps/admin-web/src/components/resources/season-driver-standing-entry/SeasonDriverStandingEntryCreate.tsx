import {
  Create,
  SimpleForm,
  required,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  DateInput,
  NumberInput,
  CreateProps,
} from 'react-admin';

export const SeasonDriverStandingEntryCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="seasonDriverId" reference="SeasonDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="eventSessionId" reference="EventSession">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="points" validate={required()} />
      <DateInput source="dateAt" validate={required()} helperText="When were the points awarded?" />
      <TextInput source="note" multiline />
    </SimpleForm>
  </Create>
);
