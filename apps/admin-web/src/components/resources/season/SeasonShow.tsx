import { TextField, DateField, ReferenceField, Show, SimpleShowLayout, ShowProps } from 'react-admin';

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
