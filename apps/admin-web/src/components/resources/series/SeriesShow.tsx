import { TextField, Show, ReferenceManyField, ShowProps, CreateButton, TabbedShowLayout, Tab } from 'react-admin';
import { SeasonList } from '../season/SeasonList';

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
