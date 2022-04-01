import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { DriverArgs } from '../args/driver.args';
import { DriversArgs } from '../args/drivers.args';
import { Driver } from '../models/driver.model';
import { SeasonTeamDriver } from '../models/season-team-driver.model';

@Resolver(Driver)
export class DriverResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Driver])
  async allDrivers(@Args() args: DriversArgs) {
    return this._prismaService.driver.findMany({
      skip: args.offset,
      take: args.limit,
    });
  }

  @Query(() => Driver)
  async Driver(@Args() args: DriverArgs) {
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
