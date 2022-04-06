import { EventSessionList } from './EventSessionList';
import { EventSessionShow } from './EventSessionShow';
import { EventSessionCreate } from './EventSessionCreate';
import { EventSessionEdit } from './EventSessionEdit';

export default {
  name: 'EventSession',
  options: { label: 'Event Sessions' },
  list: EventSessionList,
  show: EventSessionShow,
  create: EventSessionCreate,
  edit: EventSessionEdit,
};
