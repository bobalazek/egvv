import { VehicleList } from './VehicletList';
import { VehicleShow } from './VehicleShow';
import { VehicleCreate } from './VehicleCreate';
import { VehicleEdit } from './VehicleEdit';

export default {
  name: 'Vehicle',
  options: { label: 'Vehicles' },
  list: VehicleList,
  show: VehicleShow,
  create: VehicleCreate,
  edit: VehicleEdit,
};
