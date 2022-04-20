import { Driver, Season, SeasonDriver, SeasonTeam, Team } from '@prisma/client';

export interface TeamStandingInterface {
  seasonTeam: SeasonTeam & {
    team: Team;
    season: Season;
    seasonDrivers: (SeasonDriver & {
      driver: Driver;
    })[];
  };
  points: number;
  position: number;
}
