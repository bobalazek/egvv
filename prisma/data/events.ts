import dataF12018 from './events/f1-2018';
import dataF12019 from './events/f1-2019';
import dataF12020 from './events/f1-2020';
import dataF12021 from './events/f1-2021';
import dataF12022 from './events/f1-2022';

export default [
  ...dataF12018.map((data) => {
    return {
      ...data,
      seasonSlug: 'f1-2018',
    };
  }),
  ...dataF12019.map((data) => {
    return {
      ...data,
      seasonSlug: 'f1-2019',
    };
  }),
  ...dataF12020.map((data) => {
    return {
      ...data,
      seasonSlug: 'f1-2020',
    };
  }),
  ...dataF12021.map((data) => {
    return {
      ...data,
      seasonSlug: 'f1-2021',
    };
  }),
  ...dataF12022.map((data) => {
    return {
      ...data,
      seasonSlug: 'f1-2022',
    };
  }),
];
