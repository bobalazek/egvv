import { Resolver, ResolveField, Parent, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { SeasonTeamStandingEntry } from '../models/season-team-standing-entry.model';
import { EventSession } from '../models/event-session.model';
import { SeasonTeam } from '../models/season-team.model';
import { AbstractResolver } from './abstract.resolver';
import { IdArgs } from '../args/id.args';
import { AllSeasonTeamStandingEntriesArgs } from '../args/all-season-team-standing-entries.args';
import { ListMetadata } from '../models/list-metadata.model';

@Resolver(SeasonTeamStandingEntry)
export class SeasonTeamStandingEntryResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => SeasonTeamStandingEntry)
  async SeasonTeamStandingEntry(@Args() args: IdArgs) {
    return this._prismaService.seasonTeamStandingEntry.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [SeasonTeamStandingEntry])
  async allSeasonTeamStandingEntries(@Args() args: AllSeasonTeamStandingEntriesArgs) {
    return this._prismaService.seasonTeamStandingEntry.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allSeasonTeamStandingEntriesMeta(@Args() args: AllSeasonTeamStandingEntriesArgs): Promise<ListMetadata> {
    const count = await this._prismaService.seasonTeamStandingEntry.count();
    return {
      count,
    };
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
