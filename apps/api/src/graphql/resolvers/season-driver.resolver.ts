import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllSeasonDriversArgs } from '../args/season-drivers/all-season-drivers.args';
import { IdArgs } from '../args/id.args';
import { Driver } from '../models/driver.model';
import { ListMetadata } from '../models/list-metadata.model';
import { SeasonDriverStandingEntry } from '../models/season-driver-standing-entry.model';
import { SeasonDriver } from '../models/season-driver.model';
import { SeasonTeam } from '../models/season-team.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateSeasonDriverArgs } from '../args/season-drivers/create-season-driver.args';
import { UpdateSeasonDriverArgs } from '../args/season-drivers/update-season-driver.args';

@Resolver(SeasonDriver)
export class SeasonDriverResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => SeasonDriver)
  async SeasonDriver(@Args() args: IdArgs) {
    return this._prismaService.seasonDriver.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [SeasonDriver])
  async allSeasonDrivers(@Args() args: AllSeasonDriversArgs) {
    return this._prismaService.seasonDriver.findMany(this.getAllArgs(args, false, ['code']));
  }

  @Query(() => ListMetadata)
  async _allSeasonDriversMeta(@Args() args: AllSeasonDriversArgs): Promise<ListMetadata> {
    const count = await this._prismaService.seasonDriver.count(this.getAllArgs(args, true, ['code']));
    return {
      count,
    };
  }

  @Mutation(() => SeasonDriver)
  async createEvent(@Args() args: CreateSeasonDriverArgs) {
    return this._prismaService.seasonDriver.create({
      data: args,
    });
  }

  @Mutation(() => SeasonDriver)
  async updateSeasonDriver(@Args() args: UpdateSeasonDriverArgs) {
    return this._prismaService.seasonDriver.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => SeasonDriver)
  async deleteSeasonDriver(@Args() args: IdArgs) {
    return this._prismaService.seasonDriver.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('name', () => String)
  async name(@Parent() parent: SeasonDriver) {
    const seasonTeam = await this._prismaService.seasonTeam.findFirst({
      where: {
        id: parent.seasonTeamId,
      },
      include: {
        season: true,
      },
    });

    return `${parent.code} (${parent.number}) @ ${seasonTeam.shortName} for ${seasonTeam.season.name}`;
  }

  @ResolveField('seasonTeam', () => SeasonTeam)
  async seasonTeam(@Parent() parent: SeasonDriver) {
    return this._prismaService.seasonTeam.findFirst({
      where: {
        id: parent.seasonTeamId,
      },
    });
  }

  @ResolveField('driver', () => Driver)
  async driver(@Parent() parent: SeasonDriver) {
    return this._prismaService.driver.findFirst({
      where: {
        id: parent.driverId,
      },
    });
  }

  @ResolveField('seasonDriverStandingEntries', () => [SeasonDriverStandingEntry])
  async seasonDriverStandingEntries(@Parent() parent: SeasonTeam) {
    return this._prismaService.seasonDriverStandingEntry.findMany({
      where: {
        seasonDriverId: parent.id,
      },
    });
  }
}
