import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  required,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ShowButton,
  EditButton,
  DeleteButton,
  ReferenceInput,
  AutocompleteInput,
  ListProps,
  ShowProps,
  CreateProps,
  EditProps,
} from 'react-admin';

export const SeasonList = (props: ListProps) => (
  <List
    sort={{
      field: 'startAt',
      order: 'desc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="year" />
      <DateField source="startAt" />
      <DateField source="endAt" />
      <ReferenceField source="seriesId" reference="Series">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton redirect={props.options?.deleteRedirect ?? false} />
    </Datagrid>
  </List>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeasonShowTitle = (data: any) => <span>Seasons - {data.record.name}</span>;

export const SeasonShow = (props: ShowProps) => (
  <Show title={<SeasonShowTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="year" />
      <DateField source="startAt" />
      <DateField source="endAt" />
      <ReferenceField source="seriesId" reference="Series">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

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
