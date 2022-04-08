import { SeasonDriverList } from './SeasonDriverList';
import { SeasonDriverShow } from './SeasonDriverShow';
import { SeasonDriverCreate } from './SeasonDriverCreate';
import { SeasonDriverEdit } from './SeasonDriverEdit';

export default {
  name: 'SeasonDriver',
  options: { label: 'Season Drivers' },
  list: SeasonDriverList,
  show: SeasonDriverShow,
  create: SeasonDriverCreate,
  edit: SeasonDriverEdit,
};
