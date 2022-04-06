import { TeamList } from './TeamList';
import { TeamShow } from './TeamShow';
import { TeamCreate } from './TeamCreate';
import { TeamEdit } from './TeamEdit';

export default {
  name: 'Team',
  options: { label: 'Teams' },
  list: TeamList,
  show: TeamShow,
  create: TeamCreate,
  edit: TeamEdit,
};
