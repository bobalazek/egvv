import { SeasonList } from './SeasonList';
import { SeasonShow } from './SeasonShow';
import { SeasonCreate } from './SeasonCreate';
import { SeasonEdit } from './SeasonEdit';

export default {
  name: 'Season',
  options: { label: 'Seasons' },
  list: SeasonList,
  show: SeasonShow,
  create: SeasonCreate,
  edit: SeasonEdit,
};
