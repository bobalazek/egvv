import dataF12020 from './season-drivers/f1-2020';
import dataF12021 from './season-drivers/f1-2021';
import dataF12022 from './season-drivers/f1-2022';

export default [
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
