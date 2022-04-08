import { EventSessionDriverStartingGridList } from './EventSessionDriverStartingGridList';
import { EventSessionDriverStartingGridShow } from './EventSessionDriverStartingGridShow';
import { EventSessionDriverStartingGridCreate } from './EventSessionDriverStartingGridCreate';
import { EventSessionDriverStartingGridEdit } from './EventSessionDriverStartingGridEdit';

export default {
  name: 'EventSessionDriverStartingGrid',
  options: { label: 'Event Session Driver Starting Grids' },
  list: EventSessionDriverStartingGridList,
  show: EventSessionDriverStartingGridShow,
  create: EventSessionDriverStartingGridCreate,
  edit: EventSessionDriverStartingGridEdit,
};
