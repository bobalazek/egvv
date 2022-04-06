import { CircuitList } from './CircuitList';
import { CircuitShow } from './CircuitShow';
import { CircuitCreate } from './CircuitCreate';
import { CircuitEdit } from './CircuitEdit';

export default {
  name: 'Circuit',
  options: { label: 'Circuits' },
  list: CircuitList,
  show: CircuitShow,
  create: CircuitCreate,
  edit: CircuitEdit,
};
