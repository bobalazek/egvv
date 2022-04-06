import { SeasonTeamList } from './SeasonTeamList';
import { SeasonTeamShow } from './SeasonTeamShow';
import { SeasonTeamCreate } from './SeasonTeamCreate';
import { SeasonTeamEdit } from './SeasonTeamEdit';

export default {
  name: 'SeasonTeam',
  options: { label: 'Season Teams' },
  list: SeasonTeamList,
  show: SeasonTeamShow,
  create: SeasonTeamCreate,
  edit: SeasonTeamEdit,
};
