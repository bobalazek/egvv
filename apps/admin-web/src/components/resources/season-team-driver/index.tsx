import { SeasonTeamDriverList } from './SeasonTeamDriverList';
import { SeasonTeamDriverShow } from './SeasonTeamDriverShow';
import { SeasonTeamDriverCreate } from './SeasonTeamDriverCreate';
import { SeasonTeamDriverEdit } from './SeasonTeamDriverEdit';

export default {
  name: 'SeasonTeamDriver',
  options: { label: 'Season Team Drivers' },
  list: SeasonTeamDriverList,
  show: SeasonTeamDriverShow,
  create: SeasonTeamDriverCreate,
  edit: SeasonTeamDriverEdit,
};
