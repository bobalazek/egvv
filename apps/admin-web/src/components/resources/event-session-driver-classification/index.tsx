import { EventSessionDriverClassificationList } from './EventSessionDriverClassificationList';
import { EventSessionDriverClassificationShow } from './EventSessionDriverClassificationShow';
import { EventSessionDriverClassificationCreate } from './EventSessionDriverClassificationCreate';
import { EventSessionDriverClassificationEdit } from './EventSessionDriverClassificationEdit';

export default {
  name: 'EventSessionDriverClassification',
  options: { label: 'Event Session Driver Classifications' },
  list: EventSessionDriverClassificationList,
  show: EventSessionDriverClassificationShow,
  create: EventSessionDriverClassificationCreate,
  edit: EventSessionDriverClassificationEdit,
};
