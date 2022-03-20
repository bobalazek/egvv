import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { SeasonTeamDriverPointStandingsEntryArgs } from '../args/season-team-driver-standing-entry.args';
import { SeasonTeamDriverPointStandingsEntry } from '../types/season-team-driver-point-standings-entry.type';
import { EventSession } from '../types/event-session.type';
import { SeasonTeam } from '../types/season-team.type';

@Resolver(SeasonTeamDriverPointStandingsEntry)
export class SeasonTeamDriverPointStandingsEntryResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [SeasonTeamDriverPointStandingsEntry])
  async seasonTeamDriverPointStandingsEntries(@Args() args: SeasonTeamDriverPointStandingsEntryArgs) {
    return this._prismaService.seasonTeamPointStandingsEntry.findMany({
      where: {
        eventSessionId: args.eventSessionId,
      },
    });
  }

  @ResolveField('seasonDriverTeam', () => SeasonTeam)
  async seasonTeam(@Parent() parent: SeasonTeamDriverPointStandingsEntry) {
    return this._prismaService.seasonTeamDriver.findFirst({
      where: {
        id: parent.seasonTeamDriverId,
      },
    });
  }

  @ResolveField('eventSession', () => EventSession)
  async driver(@Parent() parent: SeasonTeamDriverPointStandingsEntry) {
    return this._prismaService.eventSession.findFirst({
      where: {
        id: parent.eventSessionId,
      },
    });
  }
}
