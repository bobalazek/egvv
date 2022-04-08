import { EventSessionDriverLapList } from './EventSessionDriverLapList';
import { EventSessionDriverLapShow } from './EventSessionDriverLapShow';
import { EventSessionDriverLapCreate } from './EventSessionDriverLapCreate';
import { EventSessionDriverLapEdit } from './EventSessionDriverLapEdit';

export default {
  name: 'EventSessionDriverLap',
  options: { label: 'Event Session Driver Laps' },
  list: EventSessionDriverLapList,
  show: EventSessionDriverLapShow,
  create: EventSessionDriverLapCreate,
  edit: EventSessionDriverLapEdit,
};
