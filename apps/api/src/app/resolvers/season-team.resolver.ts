import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../services/prisma.service';
import { SeasonTeamDriver } from '../types/season-team-driver.type';
import { SeasonTeamStandingEntry } from '../types/season-team-standing-entry.type';
import { SeasonTeam } from '../types/season-team.type';
import { Season } from '../types/season.type';
import { Team } from '../types/team.type';
import { Vehicle } from '../types/vehicle.type';

@Resolver(SeasonTeam)
export class SeasonTeamResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @ResolveField('seasonTeamDrivers', () => [SeasonTeamDriver])
  async seasonTeamDrivers(@Parent() parent: SeasonTeam) {
    return this._prismaService.seasonTeamDriver.findMany({
      where: {
        seasonTeamId: parseInt(parent.id),
      },
    });
  }

  @ResolveField('season', () => Season)
  async season(@Parent() parent: SeasonTeam) {
    return this._prismaService.season.findFirst({
      where: {
        id: parent.seasonId,
      },
    });
  }

  @ResolveField('team', () => Team)
  async team(@Parent() parent: SeasonTeam) {
    return this._prismaService.team.findFirst({
      where: {
        id: parent.teamId,
      },
    });
  }

  @ResolveField('vehicle', () => Vehicle)
  async vehicle(@Parent() parent: SeasonTeam) {
    return this._prismaService.vehicle.findFirst({
      where: {
        id: parent.vehicleId,
      },
    });
  }

  @ResolveField('seasonTeamStandingEntries', () => [SeasonTeamStandingEntry])
  async seasonTeamStandingEntries(@Parent() parent: SeasonTeam) {
    return this._prismaService.seasonTeamStandingEntry.findMany({
      where: {
        seasonTeamId: parseInt(parent.id),
      },
    });
  }
}
