import { SeasonTeamStandingEntryList } from './SeasonTeamStandingEntryList';
import { SeasonTeamStandingEntryShow } from './SeasonTeamStandingEntryShow';
import { SeasonTeamStandingEntryCreate } from './SeasonTeamStandingEntryCreate';
import { SeasonTeamStandingEntryEdit } from './SeasonTeamStandingEntryEdit';

export default {
  name: 'SeasonTeamStandingEntry',
  options: { label: 'Season Team Standing Entries' },
  list: SeasonTeamStandingEntryList,
  show: SeasonTeamStandingEntryShow,
  create: SeasonTeamStandingEntryCreate,
  edit: SeasonTeamStandingEntryEdit,
};
