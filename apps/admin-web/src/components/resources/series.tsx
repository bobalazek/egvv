import {
  List,
  Datagrid,
  TextField,
  Show,
  SimpleShowLayout,
  ShowButton,
  Edit,
  SimpleForm,
  TextInput,
  required,
  EditButton,
  Create,
  DeleteButton,
  ReferenceManyField,
  ShowProps,
  ListProps,
  CreateProps,
  EditProps,
} from 'react-admin';
import { SeasonList } from './season';

export const SeriesList = (props: ListProps) => (
  <List
    sort={{
      field: 'name',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="url" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const SeriesShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="url" />
      <ReferenceManyField
        target="seriesId"
        reference="Season"
        label="Seasons"
        sort={{
          field: 'startAt',
          order: 'desc',
        }}
        filter={{ seriesId: props.id }}
      >
        <SeasonList />
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);

export const SeriesCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="url" validate={required()} />
    </SimpleForm>
  </Create>
);

export const SeriesEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="slug" validate={required()} />
      <TextInput source="name" validate={required()} />
      <TextInput source="url" validate={required()} />
    </SimpleForm>
  </Edit>
);
