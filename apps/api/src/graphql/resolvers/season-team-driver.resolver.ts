import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllSeasonTeamDriversArgs } from '../args/season-team-drivers/all-season-team-drivers.args';
import { IdArgs } from '../args/id.args';
import { Driver } from '../models/driver.model';
import { ListMetadata } from '../models/list-metadata.model';
import { SeasonTeamDriverStandingEntry } from '../models/season-team-driver-standing-entry.model';
import { SeasonTeamDriver } from '../models/season-team-driver.model';
import { SeasonTeam } from '../models/season-team.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateSeasonTeamDriverArgs } from '../args/season-team-drivers/create-season-team-driver.args';
import { UpdateSeasonTeamDriverArgs } from '../args/season-team-drivers/update-season-team-driver.args';

@Resolver(SeasonTeamDriver)
export class SeasonTeamDriverResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => SeasonTeamDriver)
  async SeasonTeamDriver(@Args() args: IdArgs) {
    return this._prismaService.seasonTeamDriver.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [SeasonTeamDriver])
  async allSeasonTeamDrivers(@Args() args: AllSeasonTeamDriversArgs) {
    return this._prismaService.seasonTeamDriver.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allSeasonTeamDriversMeta(@Args() args: AllSeasonTeamDriversArgs): Promise<ListMetadata> {
    const count = await this._prismaService.seasonTeamDriver.count();
    return {
      count,
    };
  }

  @Mutation(() => SeasonTeamDriver)
  async createEvent(@Args() args: CreateSeasonTeamDriverArgs) {
    return this._prismaService.seasonTeamDriver.create({
      data: args,
    });
  }

  @Mutation(() => SeasonTeamDriver)
  async updateSeasonTeamDriver(@Args() args: UpdateSeasonTeamDriverArgs) {
    return this._prismaService.seasonTeamDriver.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => SeasonTeamDriver)
  async deleteSeasonTeamDriver(@Args() args: IdArgs) {
    return this._prismaService.seasonTeamDriver.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('name', () => String)
  async name(@Parent() parent: SeasonTeamDriver) {
    return `${parent.code} (${parent.number})`;
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
        seasonTeamDriverId: parent.id,
      },
    });
  }
}
