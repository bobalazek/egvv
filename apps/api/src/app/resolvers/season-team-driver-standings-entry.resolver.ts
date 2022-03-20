import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { SeasonTeamDriverStandingsEntry } from '../types/season-team-driver-standings-entry.type';
import { EventSession } from '../types/event-session.type';
import { SeasonTeam } from '../types/season-team.type';

@Resolver(SeasonTeamDriverStandingsEntry)
export class SeasonTeamDriverStandingsEntryResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @ResolveField('seasonDriverTeam', () => SeasonTeam)
  async seasonTeam(@Parent() parent: SeasonTeamDriverStandingsEntry) {
    return this._prismaService.seasonTeamDriver.findFirst({
      where: {
        id: parent.seasonTeamDriverId,
      },
    });
  }

  @ResolveField('eventSession', () => EventSession)
  async driver(@Parent() parent: SeasonTeamDriverStandingsEntry) {
    return this._prismaService.eventSession.findFirst({
      where: {
        id: parent.eventSessionId,
      },
    });
  }

  @ResolveField('seasonTeamDriverStandingsEntries', () => [SeasonTeamDriverStandingsEntry])
  async seasonTeamDriverStandingsEntries(@Parent() parent: SeasonTeam) {
    return this._prismaService.seasonTeamDriverStandingsEntry.findMany({
      where: {
        seasonTeamDriverId: parseInt(parent.id),
      },
    });
  }
}
