import { Resolver, Query, Parent, ResolveField, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AbstractResolver } from './abstract.resolver';
import { IdArgs } from '../args/id.args';
import { AllTeamsArgs } from '../args/team/all-teams.args';
import { SeasonTeam } from '../models/season-team.model';
import { Team } from '../models/team.model';
import { ListMetadata } from '../models/list-metadata.model';
import { CreateTeamArgs } from '../args/team/create-team.args';
import { UpdateTeamArgs } from '../args/team/update-team.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

@Resolver(Team)
export class TeamResolver extends AbstractResolver {
  @Query(() => Team)
  async Team(@Args() args: IdArgs) {
    return this._prismaService.team.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [Team])
  async allTeams(@Args() args: AllTeamsArgs) {
    return this._prismaService.team.findMany(
      await this.getPrismaArgs(args, false, ['slug', 'name', 'location', 'countryCode'])
    );
  }

  @Query(() => ListMetadata)
  async _allTeamsMeta(@Args() args: AllTeamsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.team.count(
      await this.getPrismaArgs(args, true, ['slug', 'name', 'location', 'countryCode'])
    );
    return {
      count,
    };
  }

  @Mutation(() => Team)
  @UseGuards(GqlAuthGuard)
  async createTeam(@Args() args: CreateTeamArgs) {
    return this._prismaService.team.create({
      data: args,
    });
  }

  @Mutation(() => Team)
  @UseGuards(GqlAuthGuard)
  async updateTeam(@Args() args: UpdateTeamArgs) {
    return this._prismaService.team.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => Team)
  @UseGuards(GqlAuthGuard)
  async deleteTeam(@Args() args: IdArgs) {
    return this._prismaService.team.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('predecessorTeam', () => Team, { nullable: true })
  async predecessorTeam(@Parent() parent: Team) {
    if (!parent.predecessorTeamId) {
      return null;
    }

    return this._prismaService.team.findFirst({
      where: {
        id: parent.predecessorTeamId,
      },
    });
  }

  @ResolveField('seasonTeams', () => [SeasonTeam])
  async seasonTeams(@Parent() parent: Team) {
    return this._prismaService.seasonTeam.findMany({
      where: {
        teamId: parent.id,
      },
    });
  }
}
