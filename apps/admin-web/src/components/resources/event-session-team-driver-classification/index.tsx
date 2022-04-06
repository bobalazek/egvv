import { EventSessionTeamDriverClassificationList } from './EventSessionTeamDriverClassificationList';
import { EventSessionTeamDriverClassificationShow } from './EventSessionTeamDriverClassificationShow';
import { EventSessionTeamDriverClassificationCreate } from './EventSessionTeamDriverClassificationCreate';
import { EventSessionTeamDriverClassificationEdit } from './EventSessionTeamDriverClassificationEdit';

export default {
  name: 'EventSessionTeamDriverClassification',
  options: { label: 'Event Session Team Driver Classifications' },
  list: EventSessionTeamDriverClassificationList,
  show: EventSessionTeamDriverClassificationShow,
  create: EventSessionTeamDriverClassificationCreate,
  edit: EventSessionTeamDriverClassificationEdit,
};
