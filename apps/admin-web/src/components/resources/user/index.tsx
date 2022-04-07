import { UserList } from './UsertList';
import { UserShow } from './UserShow';
import { UserCreate } from './UserCreate';
import { UserEdit } from './UserEdit';

export default {
  name: 'User',
  options: { label: 'Users' },
  list: UserList,
  show: UserShow,
  create: UserCreate,
  edit: UserEdit,
};
