import { DriverList } from './DriverList';
import { DriverShow } from './DriverShow';
import { DriverCreate } from './DriverCreate';
import { DriverEdit } from './DriverEdit';

export default {
  name: 'Driver',
  options: { label: 'Drivers' },
  list: DriverList,
  show: DriverShow,
  create: DriverCreate,
  edit: DriverEdit,
};
