import { SeasonDriverStandingEntryList } from './SeasonDriverStandingEntryList';
import { SeasonDriverStandingEntryShow } from './SeasonDriverStandingEntryShow';
import { SeasonDriverStandingEntryCreate } from './SeasonDriverStandingEntryCreate';
import { SeasonDriverStandingEntryEdit } from './SeasonDriverStandingEntryEdit';

export default {
  name: 'SeasonDriverStandingEntry',
  options: { label: 'Season Driver Standing Entries' },
  list: SeasonDriverStandingEntryList,
  show: SeasonDriverStandingEntryShow,
  create: SeasonDriverStandingEntryCreate,
  edit: SeasonDriverStandingEntryEdit,
};
