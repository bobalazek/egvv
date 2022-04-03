import { Resolver, ResolveField, Parent, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { SeasonTeamDriverStandingEntry } from '../models/season-team-driver-standing-entry.model';
import { EventSession } from '../models/event-session.model';
import { SeasonTeam } from '../models/season-team.model';
import { AbstractResolver } from './abstract.resolver';
import { IdArgs } from '../args/id.args';
import { AllSeasonTeamDriverStandingEntriesArgs } from '../args/all-season-team-driver-standing-entries.args';
import { ListMetadata } from '../models/list-metadata.model';

@Resolver(SeasonTeamDriverStandingEntry)
export class SeasonTeamDriverStandingEntryResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => SeasonTeamDriverStandingEntry)
  async SeasonTeamDriverStandingEntry(@Args() args: IdArgs) {
    return this._prismaService.seasonTeamDriverStandingEntry.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [SeasonTeamDriverStandingEntry])
  async allSeasonTeamDriverStandingEntries(@Args() args: AllSeasonTeamDriverStandingEntriesArgs) {
    return this._prismaService.seasonTeamDriverStandingEntry.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allSeasonTeamDriverStandingEntriesMeta(
    @Args() args: AllSeasonTeamDriverStandingEntriesArgs
  ): Promise<ListMetadata> {
    const count = await this._prismaService.seasonTeamDriverStandingEntry.count();
    return {
      count,
    };
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
