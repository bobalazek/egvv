import { Resolver, Query, Parent, ResolveField } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { Team } from '../types/team.type';

@Resolver(Team)
export class TeamResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Team])
  async teams() {
    return this._prismaService.team.findMany();
  }

  @ResolveField('predecessorTeam', () => Team, { nullable: true })
  async seasonTeam(@Parent() parent: Team) {
    return this._prismaService.team.findFirst({
      where: {
        id: parent.predecessorTeamId,
      },
    });
  }
}
