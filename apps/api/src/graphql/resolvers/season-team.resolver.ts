import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllSeasonTeamsArgs } from '../args/season-team/all-season-teams.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { SeasonTeamDriver } from '../models/season-team-driver.model';
import { SeasonTeamStandingEntry } from '../models/season-team-standing-entry.model';
import { SeasonTeam } from '../models/season-team.model';
import { Season } from '../models/season.model';
import { Team } from '../models/team.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateSeasonTeamArgs } from '../args/season-team/create-season-team.args';
import { UpdateSeasonTeamArgs } from '../args/season-team/update-season-team.args';

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
      this.getAllArgs(args, false, ['name', 'shortName', 'powerUnit', 'chassis'])
    );
  }

  @Query(() => ListMetadata)
  async _allSeasonTeamsMeta(@Args() args: AllSeasonTeamsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.seasonTeam.count(
      this.getAllArgs(args, true, ['name', 'shortName', 'powerUnit', 'chassis'])
    );

    return {
      count,
    };
  }

  @Mutation(() => SeasonTeam)
  async createSeasonTeam(@Args() args: CreateSeasonTeamArgs) {
    return this._prismaService.seasonTeam.create({
      data: args,
    });
  }

  @Mutation(() => SeasonTeam)
  async updateSeasonTeam(@Args() args: UpdateSeasonTeamArgs) {
    return this._prismaService.seasonTeam.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => SeasonTeam)
  async deleteSeasonTeam(@Args() args: IdArgs) {
    return this._prismaService.seasonTeam.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('seasonTeamDrivers', () => [SeasonTeamDriver])
  async seasonTeamDrivers(@Parent() parent: SeasonTeam) {
    return this._prismaService.seasonTeamDriver.findMany({
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
