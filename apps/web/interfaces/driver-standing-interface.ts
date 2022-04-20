import { Driver, SeasonDriver } from '@prisma/client';

export interface DriverStandingInterface {
  seasonDriver: SeasonDriver & {
    driver: Driver;
  };
  points: number;
  position: number;
}
