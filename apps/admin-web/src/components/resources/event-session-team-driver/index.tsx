import { EventSessionTeamDriverList } from './EventSessionTeamDriverList';
import { EventSessionTeamDriverShow } from './EventSessionTeamDriverShow';
import { EventSessionTeamDriverCreate } from './EventSessionTeamDriverCreate';
import { EventSessionTeamDriverEdit } from './EventSessionTeamDriverEdit';

export default {
  name: 'EventSessionTeamDriver',
  options: { label: 'Event Session Team Drivers' },
  list: EventSessionTeamDriverList,
  show: EventSessionTeamDriverShow,
  create: EventSessionTeamDriverCreate,
  edit: EventSessionTeamDriverEdit,
};
