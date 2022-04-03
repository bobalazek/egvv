import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllDriversArgs } from '../args/all-drivers.args';
import { Driver } from '../models/driver.model';
import { SeasonTeamDriver } from '../models/season-team-driver.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AbstractResolver } from './abstract.resolver';

@Resolver(Driver)
export class DriverResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => Driver)
  async Driver(@Args() args: IdArgs) {
    return this._prismaService.driver.findFirst({
      where: {
        id: parseInt(args.id),
      },
    });
  }

  @Query(() => [Driver])
  async allDrivers(@Args() args: AllDriversArgs) {
    return this._prismaService.driver.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allDriversMeta(@Args() args: AllDriversArgs): Promise<ListMetadata> {
    const count = await this._prismaService.driver.count();
    return {
      count,
    };
  }

  @ResolveField('name', () => String)
  async name(@Parent() parent: Driver) {
    return parent.firstName + ' ' + parent.lastName;
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
