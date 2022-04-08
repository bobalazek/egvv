import { EventSessionDriverPitStopList } from './EventSessionDriverPitStopList';
import { EventSessionDriverPitStopShow } from './EventSessionDriverPitStopShow';
import { EventSessionDriverPitStopCreate } from './EventSessionDriverPitStopCreate';
import { EventSessionDriverPitStopEdit } from './EventSessionDriverPitStopEdit';

export default {
  name: 'EventSessionDriverPitStop',
  options: { label: 'Event Session Driver Pit Stops' },
  list: EventSessionDriverPitStopList,
  show: EventSessionDriverPitStopShow,
  create: EventSessionDriverPitStopCreate,
  edit: EventSessionDriverPitStopEdit,
};
