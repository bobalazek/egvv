import {
  required,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceInput,
  AutocompleteInput,
  EditProps,
} from 'react-admin';

export const SeasonEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="year" validate={required()} />
      <DateInput source="startAt" validate={required()} />
      <DateInput source="endAt" />
      <ReferenceInput source="seriesId" reference="Series" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
