import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { Driver } from '../types/driver.type';
import { SeasonTeamDriverStandingEntry } from '../types/season-team-driver-standing-entry.type';
import { SeasonTeamDriver } from '../types/season-team-driver.type';
import { SeasonTeam } from '../types/season-team.type';

@Resolver(SeasonTeamDriver)
export class SeasonTeamDriverResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @ResolveField('seasonTeam', () => SeasonTeam)
  async seasonTeam(@Parent() parent: SeasonTeamDriver) {
    return this._prismaService.seasonTeam.findFirst({
      where: {
        id: parent.seasonTeamId,
      },
    });
  }

  @ResolveField('driver', () => Driver)
  async driver(@Parent() parent: SeasonTeamDriver) {
    return this._prismaService.driver.findFirst({
      where: {
        id: parent.driverId,
      },
    });
  }

  @ResolveField('seasonTeamDriverStandingEntries', () => [SeasonTeamDriverStandingEntry])
  async seasonTeamDriverStandingEntries(@Parent() parent: SeasonTeam) {
    return this._prismaService.seasonTeamDriverStandingEntry.findMany({
      where: {
        seasonTeamDriverId: parseInt(parent.id),
      },
    });
  }
}
