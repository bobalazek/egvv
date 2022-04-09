import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';
import { UpdateSeasonTeamArgs } from '../args/season-team/update-season-team.args';
import { UseGuards } from '@nestjs/common';

import { PrismaService } from '../../app/services/prisma.service';
import { AllSeasonTeamsArgs } from '../args/season-team/all-season-teams.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { SeasonDriver } from '../models/season-driver.model';
import { SeasonTeamStandingEntry } from '../models/season-team-standing-entry.model';
import { SeasonTeam } from '../models/season-team.model';
import { Season } from '../models/season.model';
import { Team } from '../models/team.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateSeasonTeamArgs } from '../args/season-team/create-season-team.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

@Resolver(SeasonTeam)
export class SeasonTeamResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => SeasonTeam)
  async SeasonTeam(@Args() args: IdArgs) {
    return this._prismaService.seasonTeam.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [SeasonTeam])
  async allSeasonTeams(@Args() args: AllSeasonTeamsArgs) {
    return this._prismaService.seasonTeam.findMany(
      this.getAllArgs(args, false, ['name', 'shortName', 'powerUnit', 'chassis', 'season.name'])
    );
  }

  @Query(() => ListMetadata)
  async _allSeasonTeamsMeta(@Args() args: AllSeasonTeamsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.seasonTeam.count(
      this.getAllArgs(args, true, ['name', 'shortName', 'powerUnit', 'chassis', 'season.name'])
    );

    return {
      count,
    };
  }

  @Mutation(() => SeasonTeam)
  @UseGuards(GqlAuthGuard)
  async createSeasonTeam(@Args() args: CreateSeasonTeamArgs) {
    return this._prismaService.seasonTeam.create({
      data: args,
    });
  }

  @Mutation(() => SeasonTeam)
  @UseGuards(GqlAuthGuard)
  async updateSeasonTeam(@Args() args: UpdateSeasonTeamArgs) {
    return this._prismaService.seasonTeam.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => SeasonTeam)
  @UseGuards(GqlAuthGuard)
  async deleteSeasonTeam(@Args() args: IdArgs) {
    return this._prismaService.seasonTeam.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('nameWithSeason', () => String)
  async nameWithSeason(@Parent() parent: SeasonTeam) {
    const seasonTeam = await this._prismaService.seasonTeam.findFirst({
      where: {
        id: parent.id,
      },
      include: {
        season: true,
      },
    });

    return `${seasonTeam.name} (${seasonTeam.season.name})`;
  }

  @ResolveField('seasonDrivers', () => [SeasonDriver])
  async seasonDrivers(@Parent() parent: SeasonTeam) {
    return this._prismaService.seasonDriver.findMany({
      where: {
        seasonTeamId: parent.id,
      },
    });
  }

  @ResolveField('season', () => Season)
  async season(@Parent() parent: SeasonTeam) {
    return this._prismaService.season.findFirst({
      where: {
        id: parent.seasonId,
      },
    });
  }

  @ResolveField('team', () => Team)
  async team(@Parent() parent: SeasonTeam) {
    return this._prismaService.team.findFirst({
      where: {
        id: parent.teamId,
      },
    });
  }

  @ResolveField('seasonTeamStandingEntries', () => [SeasonTeamStandingEntry])
  async seasonTeamStandingEntries(@Parent() parent: SeasonTeam) {
    return this._prismaService.seasonTeamStandingEntry.findMany({
      where: {
        seasonTeamId: parent.id,
      },
    });
  }
}
