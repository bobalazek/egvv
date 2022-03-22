import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../services/prisma.service';
import { SeasonTeamDriverStandingEntry } from '../types/season-team-driver-standing-entry.type';
import { EventSession } from '../types/event-session.type';
import { SeasonTeam } from '../types/season-team.type';

@Resolver(SeasonTeamDriverStandingEntry)
export class SeasonTeamDriverStandingEntryResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @ResolveField('seasonDriverTeam', () => SeasonTeam)
  async seasonTeam(@Parent() parent: SeasonTeamDriverStandingEntry) {
    return this._prismaService.seasonTeamDriver.findFirst({
      where: {
        id: parent.seasonTeamDriverId,
      },
    });
  }

  @ResolveField('eventSession', () => EventSession)
  async driver(@Parent() parent: SeasonTeamDriverStandingEntry) {
    return this._prismaService.eventSession.findFirst({
      where: {
        id: parent.eventSessionId,
      },
    });
  }
}
