import { EventSessionTeamDriverPitStopList } from './EventSessionTeamDriverPitStopList';
import { EventSessionTeamDriverPitStopShow } from './EventSessionTeamDriverPitStopShow';
import { EventSessionTeamDriverPitStopCreate } from './EventSessionTeamDriverPitStopCreate';
import { EventSessionTeamDriverPitStopEdit } from './EventSessionTeamDriverPitStopEdit';

export default {
  name: 'EventSessionTeamDriverPitStop',
  options: { label: 'Event Session Team Driver Pit Stops' },
  list: EventSessionTeamDriverPitStopList,
  show: EventSessionTeamDriverPitStopShow,
  create: EventSessionTeamDriverPitStopCreate,
  edit: EventSessionTeamDriverPitStopEdit,
};
