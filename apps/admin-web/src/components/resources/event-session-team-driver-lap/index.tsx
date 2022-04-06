import { EventSessionTeamDriverLapList } from './EventSessionTeamDriverLapList';
import { EventSessionTeamDriverLapShow } from './EventSessionTeamDriverLapShow';
import { EventSessionTeamDriverLapCreate } from './EventSessionTeamDriverLapCreate';
import { EventSessionTeamDriverLapEdit } from './EventSessionTeamDriverLapEdit';

export default {
  name: 'EventSessionTeamDriverLap',
  options: { label: 'Event Session Team Driver Laps' },
  list: EventSessionTeamDriverLapList,
  show: EventSessionTeamDriverLapShow,
  create: EventSessionTeamDriverLapCreate,
  edit: EventSessionTeamDriverLapEdit,
};
