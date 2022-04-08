import { EventSessionDriverList } from './EventSessionDriverList';
import { EventSessionDriverShow } from './EventSessionDriverShow';
import { EventSessionDriverCreate } from './EventSessionDriverCreate';
import { EventSessionDriverEdit } from './EventSessionDriverEdit';

export default {
  name: 'EventSessionDriver',
  options: { label: 'Event Session Drivers' },
  list: EventSessionDriverList,
  show: EventSessionDriverShow,
  create: EventSessionDriverCreate,
  edit: EventSessionDriverEdit,
};
