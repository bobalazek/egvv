import { Resolver, Query, Args, Parent, ResolveField, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { IdArgs } from '../args/id.args';
import { Driver } from '../models/driver.model';
import { SeasonDriver } from '../models/season-driver.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AbstractResolver } from './abstract.resolver';
import { AllDriversArgs } from '../args/driver/all-drivers.args';
import { CreateDriverArgs } from '../args/driver/create-driver.args';
import { UpdateDriverArgs } from '../args/driver/update-driver.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

@Resolver(Driver)
export class DriverResolver extends AbstractResolver {
  @Query(() => Driver)
  async Driver(@Args() args: IdArgs) {
    return this._prismaService.driver.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [Driver])
  async allDrivers(@Args() args: AllDriversArgs) {
    return this._prismaService.driver.findMany(
      await this.getPrismaArgs(args, false, ['slug', 'firstName', 'lastName', 'countryCode'])
    );
  }

  @Query(() => ListMetadata)
  async _allDriversMeta(@Args() args: AllDriversArgs): Promise<ListMetadata> {
    const count = await this._prismaService.driver.count(
      await this.getPrismaArgs(args, true, ['slug', 'firstName', 'lastName', 'countryCode'])
    );
    return {
      count,
    };
  }

  @Mutation(() => Driver)
  @UseGuards(GqlAuthGuard)
  async createDriver(@Args() args: CreateDriverArgs) {
    return this._prismaService.driver.create({
      data: args,
    });
  }

  @Mutation(() => Driver)
  @UseGuards(GqlAuthGuard)
  async updateDriver(@Args() args: UpdateDriverArgs) {
    return this._prismaService.driver.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => Driver)
  @UseGuards(GqlAuthGuard)
  async deleteDriver(@Args() args: IdArgs) {
    return this._prismaService.driver.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('name', () => String)
  async name(@Parent() parent: Driver) {
    return parent.firstName + ' ' + parent.lastName;
  }

  @ResolveField('seasonDrivers', () => [SeasonDriver])
  async seasonDrivers(@Parent() parent: Driver) {
    return this._prismaService.seasonDriver.findMany({
      where: {
        driverId: parent.id,
      },
    });
  }
}
