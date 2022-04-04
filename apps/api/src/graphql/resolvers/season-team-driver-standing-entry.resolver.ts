import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { SeasonTeamDriverStandingEntry } from '../models/season-team-driver-standing-entry.model';
import { EventSession } from '../models/event-session.model';
import { SeasonTeam } from '../models/season-team.model';
import { AbstractResolver } from './abstract.resolver';
import { IdArgs } from '../args/id.args';
import { AllSeasonTeamDriverStandingEntriesArgs } from '../args/season-team-driver-standing-entry/all-season-team-driver-standing-entries.args';
import { ListMetadata } from '../models/list-metadata.model';
import { CreateSeasonTeamDriverStandingEntryArgs } from '../args/season-team-driver-standing-entry/create-season-team-driver-standing-entry.args';
import { UpdateSeasonTeamDriverStandingEntryArgs } from '../args/season-team-driver-standing-entry/update-season-team-driver-standing-entry.args';

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

  @Mutation(() => SeasonTeamDriverStandingEntry)
  async createSeasonTeamDriverStandingEntry(@Args() args: CreateSeasonTeamDriverStandingEntryArgs) {
    return this._prismaService.seasonTeamDriverStandingEntry.create({
      data: args,
    });
  }

  @Mutation(() => SeasonTeamDriverStandingEntry)
  async updateSeasonTeamDriverStandingEntry(@Args() args: UpdateSeasonTeamDriverStandingEntryArgs) {
    return this._prismaService.seasonTeamDriverStandingEntry.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => SeasonTeamDriverStandingEntry)
  async deleteSeasonTeamDriverStandingEntry(@Args() args: IdArgs) {
    return this._prismaService.seasonTeamDriverStandingEntry.delete({
      where: {
        id: args.id,
      },
    });
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
