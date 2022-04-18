import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  Edit,
  required,
  EditProps,
  NumberInput,
} from 'react-admin';

import { CLASSIFICATION_STATUSES } from '@egvv/shared-constants';

export const EventSessionDriverClassificationEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput source="eventSessionDriverId" reference="EventSessionDriver" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <AutocompleteInput source="status" choices={CLASSIFICATION_STATUSES} validate={required()} />
      <TextInput source="position" />
      <NumberInput source="timeMilliseconds" />
      <TextInput source="laps" />
      <TextInput source="lapsBehind" />
      <TextInput source="points" />
      <TextInput source="note" multiline />
    </SimpleForm>
  </Edit>
);
