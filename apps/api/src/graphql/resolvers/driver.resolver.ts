import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllDriversArgs } from '../args/all-drivers.args';
import { Driver } from '../models/driver.model';
import { SeasonTeamDriver } from '../models/season-team-driver.model';

@Resolver(Driver)
export class DriverResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Driver])
  async allDrivers(@Args() args: AllDriversArgs) {
    return this._prismaService.driver.findMany({
      skip: (args.page - 1) * args.perPage + 1,
      take: args.perPage,
    });
  }

  @Query(() => Driver)
  async Driver(@Args() args: IdArgs) {
    return this._prismaService.driver.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('seasonTeamDrivers', () => [SeasonTeamDriver])
  async seasonTeamDrivers(@Parent() parent: Driver) {
    return this._prismaService.seasonTeamDriver.findMany({
      where: {
        driverId: parseInt(parent.id),
      },
    });
  }
}
