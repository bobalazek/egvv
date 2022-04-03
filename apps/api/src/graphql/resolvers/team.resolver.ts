import { Resolver, Query, Parent, ResolveField, Args } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllTeamsArgs } from '../args/all-teams.args';
import { SeasonTeam } from '../models/season-team.model';
import { Team } from '../models/team.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AbstractResolver } from './abstract.resolver';

@Resolver(Team)
export class TeamResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

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
    return this._prismaService.team.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allTeamsMeta(@Args() args: AllTeamsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.team.count();
    return {
      count,
    };
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
