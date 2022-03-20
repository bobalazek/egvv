import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { SeasonTeamStandingEntry } from '../types/season-team-standing-entry.type';
import { EventSession } from '../types/event-session.type';
import { SeasonTeam } from '../types/season-team.type';

@Resolver(SeasonTeamStandingEntry)
export class SeasonTeamStandingEntryResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @ResolveField('seasonTeam', () => SeasonTeam)
  async seasonTeam(@Parent() parent: SeasonTeamStandingEntry) {
    return this._prismaService.seasonTeam.findFirst({
      where: {
        id: parent.seasonTeamId,
      },
    });
  }

  @ResolveField('eventSession', () => EventSession)
  async driver(@Parent() parent: SeasonTeamStandingEntry) {
    return this._prismaService.eventSession.findFirst({
      where: {
        id: parent.eventSessionId,
      },
    });
  }
}
