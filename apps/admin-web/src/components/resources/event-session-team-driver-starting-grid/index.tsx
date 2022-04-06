import { EventSessionTeamDriverStartingGridList } from './EventSessionTeamDriverStartingGridList';
import { EventSessionTeamDriverStartingGridShow } from './EventSessionTeamDriverStartingGridShow';
import { EventSessionTeamDriverStartingGridCreate } from './EventSessionTeamDriverStartingGridCreate';
import { EventSessionTeamDriverStartingGridEdit } from './EventSessionTeamDriverStartingGridEdit';

export default {
  name: 'EventSessionTeamDriverStartingGrid',
  options: { label: 'Event Session Team Driver Starting Grids' },
  list: EventSessionTeamDriverStartingGridList,
  show: EventSessionTeamDriverStartingGridShow,
  create: EventSessionTeamDriverStartingGridCreate,
  edit: EventSessionTeamDriverStartingGridEdit,
};
