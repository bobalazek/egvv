import { EventSessionTeamDriverList } from './EventSessionDriverList';
import { EventSessionTeamDriverShow } from './EventSessionDriverShow';
import { EventSessionTeamDriverCreate } from './EventSessionDriverCreate';
import { EventSessionTeamDriverEdit } from './EventSessionDriverEdit';

export default {
  name: 'EventSessionTeamDriver',
  options: { label: 'Event Session Team Drivers' },
  list: EventSessionTeamDriverList,
  show: EventSessionTeamDriverShow,
  create: EventSessionTeamDriverCreate,
  edit: EventSessionTeamDriverEdit,
};
