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
import { SeasonDriverStandingEntrySessionDriverInput } from './SeasonDriverStandingEntrySessionDriverInput';

export const SeasonDriverStandingEntryCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="seasonDriverId" reference="SeasonDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <SeasonDriverStandingEntrySessionDriverInput source="eventSessionId" reference="EventSession" />
      <NumberInput source="points" validate={required()} />
      <DateInput source="dateAt" validate={required()} helperText="When were the points awarded?" />
      <TextInput source="note" multiline />
    </SimpleForm>
  </Create>
);
