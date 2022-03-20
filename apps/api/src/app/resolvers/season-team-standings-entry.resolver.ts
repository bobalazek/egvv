import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { SeasonTeamStandingsEntryArgs } from '../args/season-team-standing-entry.args';
import { SeasonTeamStandingsEntry } from '../types/season-team-standings-entry.type';
import { EventSession } from '../types/event-session.type';
import { SeasonTeam } from '../types/season-team.type';

@Resolver(SeasonTeamStandingsEntry)
export class SeasonTeamStandingsEntryResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [SeasonTeamStandingsEntry])
  async seasonTeamStandingsEntries(@Args() args: SeasonTeamStandingsEntryArgs) {
    return this._prismaService.seasonTeamStandingsEntry.findMany({
      where: {
        eventSessionId: args.eventSessionId,
      },
    });
  }

  @ResolveField('seasonTeam', () => SeasonTeam)
  async seasonTeam(@Parent() parent: SeasonTeamStandingsEntry) {
    return this._prismaService.seasonTeam.findFirst({
      where: {
        id: parent.seasonTeamId,
      },
    });
  }

  @ResolveField('eventSession', () => EventSession)
  async driver(@Parent() parent: SeasonTeamStandingsEntry) {
    return this._prismaService.eventSession.findFirst({
      where: {
        id: parent.eventSessionId,
      },
    });
  }
}
