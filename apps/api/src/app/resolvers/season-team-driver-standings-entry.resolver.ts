import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { SeasonTeamDriverStandingsEntryArgs } from '../args/season-team-driver-standing-entry.args';
import { SeasonTeamDriverStandingsEntry } from '../types/season-team-driver-standings-entry.type';
import { EventSession } from '../types/event-session.type';
import { SeasonTeam } from '../types/season-team.type';

@Resolver(SeasonTeamDriverStandingsEntry)
export class SeasonTeamDriverStandingsEntryResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [SeasonTeamDriverStandingsEntry])
  async seasonTeamDriverStandingsEntries(@Args() args: SeasonTeamDriverStandingsEntryArgs) {
    return this._prismaService.seasonTeamStandingsEntry.findMany({
      where: {
        eventSessionId: args.eventSessionId,
      },
    });
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
}
