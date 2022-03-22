import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';

import { PrismaService } from '../services/prisma.service';
import { DriverArgs } from '../args/driver.args';
import { DriversArgs } from '../args/drivers.args';
import { Driver } from '../types/driver.type';
import { SeasonTeamDriver } from '../types/season-team-driver.type';

@Resolver(Driver)
export class DriverResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Driver])
  async drivers(@Args() args: DriversArgs) {
    return this._prismaService.driver.findMany({
      skip: args.offset,
      take: args.limit,
    });
  }

  @Query(() => Driver)
  async driver(@Args() args: DriverArgs) {
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
