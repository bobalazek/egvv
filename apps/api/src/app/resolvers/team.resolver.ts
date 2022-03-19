import { Resolver, Query } from '@nestjs/graphql';

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
}
