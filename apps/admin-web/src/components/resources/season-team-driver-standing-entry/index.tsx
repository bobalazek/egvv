import { SeasonTeamDriverStandingEntryList } from './SeasonTeamDriverStandingEntryList';
import { SeasonTeamDriverStandingEntryShow } from './SeasonTeamDriverStandingEntryShow';
import { SeasonTeamDriverStandingEntryCreate } from './SeasonTeamDriverStandingEntryCreate';
import { SeasonTeamDriverStandingEntryEdit } from './SeasonTeamDriverStandingEntryEdit';

export default {
  name: 'SeasonTeamDriverStandingEntry',
  options: { label: 'Season Team Driver Standing Entries' },
  list: SeasonTeamDriverStandingEntryList,
  show: SeasonTeamDriverStandingEntryShow,
  create: SeasonTeamDriverStandingEntryCreate,
  edit: SeasonTeamDriverStandingEntryEdit,
};
