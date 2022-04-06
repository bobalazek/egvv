import { SeriesList } from './SeriesList';
import { SeriesShow } from './SeriesShow';
import { SeriesCreate } from './SeriesCreate';
import { SeriesEdit } from './SeriesEdit';

export default {
  name: 'Series',
  options: { label: 'Series' },
  list: SeriesList,
  show: SeriesShow,
  create: SeriesCreate,
  edit: SeriesEdit,
};
