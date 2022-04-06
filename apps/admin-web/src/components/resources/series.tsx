import {
  List,
  Datagrid,
  TextField,
  Show,
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
  CreateButton,
  TabbedShowLayout,
  Tab,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeriesShowTitle = (data: any) => <span>Series - {data.record.name}</span>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeriesShowAddSeasonButton = (data: any) => (
  <CreateButton to={`/Season/create?seriesId=${data.record.id}`} size="large" variant="outlined" label="Add a season" />
);

export const SeriesShow = (props: ShowProps) => (
  <Show title={<SeriesShowTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="slug" />
        <TextField source="name" />
        <TextField source="url" />
      </Tab>
      <Tab label="Seasons" path="seasons">
        <ReferenceManyField
          target="seriesId"
          reference="Season"
          label=""
          sort={{
            field: 'startAt',
            order: 'desc',
          }}
          filter={{ seriesId: props.id }}
        >
          <SeasonList
            title={' '}
            options={{
              deleteRedirect: `/series/${props.id}/show/seasons`,
            }}
          />
        </ReferenceManyField>
        <SeriesShowAddSeasonButton />
        <br />
      </Tab>
    </TabbedShowLayout>
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
