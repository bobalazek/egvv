import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { SeasonTeamPointStandingsEntryArgs } from '../args/season-team-standing-entry.args';
import { SeasonTeamPointStandingsEntry } from '../types/season-team-point-standings-entry.type';
import { EventSession } from '../types/event-session.type';
import { SeasonTeam } from '../types/season-team.type';

@Resolver(SeasonTeamPointStandingsEntry)
export class SeasonTeamPointStandingsEntryResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [SeasonTeamPointStandingsEntry])
  async seasonTeamPointStandingsEntries(@Args() args: SeasonTeamPointStandingsEntryArgs) {
    return this._prismaService.seasonTeamPointStandingsEntry.findMany({
      where: {
        eventSessionId: args.eventSessionId,
      },
    });
  }

  @ResolveField('seasonTeam', () => SeasonTeam)
  async seasonTeam(@Parent() parent: SeasonTeamPointStandingsEntry) {
    return this._prismaService.seasonTeam.findFirst({
      where: {
        id: parent.seasonTeamId,
      },
    });
  }

  @ResolveField('eventSession', () => EventSession)
  async driver(@Parent() parent: SeasonTeamPointStandingsEntry) {
    return this._prismaService.eventSession.findFirst({
      where: {
        id: parent.eventSessionId,
      },
    });
  }
}
