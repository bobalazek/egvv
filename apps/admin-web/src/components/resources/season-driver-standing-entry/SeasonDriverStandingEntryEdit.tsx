import {
  SimpleForm,
  required,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  Edit,
  DateInput,
  NumberInput,
  EditProps,
} from 'react-admin';
import { SeasonDriverStandingEntrySessionDriverInput } from './SeasonDriverStandingEntrySessionDriverInput';

export const SeasonDriverStandingEntryEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput source="seasonDriverId" reference="SeasonDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <SeasonDriverStandingEntrySessionDriverInput source="eventSessionId" reference="EventSession" />
      <NumberInput source="points" validate={required()} />
      <DateInput source="dateAt" validate={required()} helperText="When were the points awarded?" />
      <TextInput source="note" multiline />
    </SimpleForm>
  </Edit>
);
