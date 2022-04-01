import { Resolver, Query, Parent, ResolveField, Args } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllTeamsArgs } from '../args/all-teams.args';
import { SeasonTeam } from '../models/season-team.model';
import { Team } from '../models/team.model';

@Resolver(Team)
export class TeamResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Team])
  async allTeams(@Args() args: AllTeamsArgs) {
    return this._prismaService.team.findMany({
      skip: (args.page - 1) * args.perPage + 1,
      take: args.perPage,
    });
  }

  @Query(() => Team)
  async Team(@Args() args: IdArgs) {
    return this._prismaService.team.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('predecessorTeam', () => Team, { nullable: true })
  async predecessorTeam(@Parent() parent: Team) {
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
        teamId: parseInt(parent.id),
      },
    });
  }
}
