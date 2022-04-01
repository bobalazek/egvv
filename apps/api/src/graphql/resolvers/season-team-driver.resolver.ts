import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { Driver } from '../models/driver.model';
import { SeasonTeamDriverStandingEntry } from '../models/season-team-driver-standing-entry.model';
import { SeasonTeamDriver } from '../models/season-team-driver.model';
import { SeasonTeam } from '../models/season-team.model';

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
