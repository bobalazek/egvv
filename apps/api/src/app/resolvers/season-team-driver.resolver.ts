import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../services/prisma.service';
import { SeasonTeamDriverArgs } from '../args/season-team-driver.args';
import { Driver } from '../types/driver.type';
import { SeasonTeamDriver } from '../types/season-team-driver.type';
import { SeasonTeam } from '../types/season-team.type';

@Resolver(SeasonTeam)
export class SeasonTeamDriverResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [SeasonTeamDriver])
  async seasonTeamDrivers(@Args() args: SeasonTeamDriverArgs) {
    return this._prismaService.seasonTeamDriver.findMany({
      where: {
        seasonTeam: {
          season: {
            slug: args.seasonSlug,
          },
        },
      },
    });
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
}
