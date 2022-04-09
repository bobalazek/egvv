import {
  TextField,
  DateField,
  ReferenceField,
  Show,
  TabbedShowLayout,
  ShowProps,
  Tab,
  ReferenceManyField,
  Datagrid,
  ShowButton,
  EditButton,
} from 'react-admin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SeasonShowTitle = (data: any) => <span>Seasons - {data.record.name}</span>;

export const SeasonShow = (props: ShowProps) => (
  <Show title={<SeasonShowTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="General">
        <TextField source="slug" />
        <TextField source="name" />
        <TextField source="year" />
        <DateField source="startAt" />
        <DateField source="endAt" />
        <ReferenceField source="seriesId" reference="Series">
          <TextField source="name" />
        </ReferenceField>
      </Tab>
      <Tab label="Teams" path="teams">
        <ReferenceManyField
          target="seasonId"
          reference="SeasonTeam"
          label=""
          sort={{
            field: 'name',
            order: 'asc',
          }}
        >
          <Datagrid>
            <TextField source="name" />
            <TextField source="shortName" />
            <ShowButton />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab label="Drivers" path="drivers">
        <ReferenceManyField
          target="seasonId"
          reference="SeasonDriver"
          label=""
          sort={{
            field: 'number',
            order: 'asc',
          }}
        >
          <Datagrid>
            <TextField source="code" />
            <TextField source="number" />
            <TextField source="isTemporary" />
            <ShowButton />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
