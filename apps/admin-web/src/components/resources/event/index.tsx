import { EventList } from './EventList';
import { EventShow } from './EventShow';
import { EventCreate } from './EventCreate';
import { EventEdit } from './EventEdit';

export default {
  name: 'Event',
  options: { label: 'Events' },
  list: EventList,
  show: EventShow,
  create: EventCreate,
  edit: EventEdit,
};
