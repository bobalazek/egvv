import { Create, SimpleForm, required, TextInput, ReferenceInput, AutocompleteInput, CreateProps } from 'react-admin';

import { FilterInput } from '../../inputs/FilterInput';

export const EventSessionDriverCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="eventSessionId" reference="EventSession" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <FilterInput source="seasonDriverId" reference="SeasonDriver" validate={required()} filterId="eventSessionId" />
      <TextInput source="number" helperText="Enter a value only if it is different from the drivers default number" />
    </SimpleForm>
  </Create>
);
