import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { SeasonDriverStandingEntry } from '../models/season-driver-standing-entry.model';
import { EventSession } from '../models/event-session.model';
import { SeasonTeam } from '../models/season-team.model';
import { AbstractResolver } from './abstract.resolver';
import { IdArgs } from '../args/id.args';
import { AllSeasonDriverStandingEntriesArgs } from '../args/season-team-driver-standing-entry/all-season-team-driver-standing-entries.args';
import { ListMetadata } from '../models/list-metadata.model';
import { CreateSeasonDriverStandingEntryArgs } from '../args/season-team-driver-standing-entry/create-season-team-driver-standing-entry.args';
import { UpdateSeasonDriverStandingEntryArgs } from '../args/season-team-driver-standing-entry/update-season-team-driver-standing-entry.args';

@Resolver(SeasonDriverStandingEntry)
export class SeasonDriverStandingEntryResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => SeasonDriverStandingEntry)
  async SeasonDriverStandingEntry(@Args() args: IdArgs) {
    return this._prismaService.seasonDriverStandingEntry.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [SeasonDriverStandingEntry])
  async allSeasonDriverStandingEntries(@Args() args: AllSeasonDriverStandingEntriesArgs) {
    return this._prismaService.seasonDriverStandingEntry.findMany(this.getAllArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allSeasonDriverStandingEntriesMeta(@Args() args: AllSeasonDriverStandingEntriesArgs): Promise<ListMetadata> {
    const count = await this._prismaService.seasonDriverStandingEntry.count(this.getAllArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => SeasonDriverStandingEntry)
  async createSeasonDriverStandingEntry(@Args() args: CreateSeasonDriverStandingEntryArgs) {
    return this._prismaService.seasonDriverStandingEntry.create({
      data: args,
    });
  }

  @Mutation(() => SeasonDriverStandingEntry)
  async updateSeasonDriverStandingEntry(@Args() args: UpdateSeasonDriverStandingEntryArgs) {
    return this._prismaService.seasonDriverStandingEntry.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => SeasonDriverStandingEntry)
  async deleteSeasonDriverStandingEntry(@Args() args: IdArgs) {
    return this._prismaService.seasonDriverStandingEntry.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('seasonDriverTeam', () => SeasonTeam)
  async seasonTeam(@Parent() parent: SeasonDriverStandingEntry) {
    return this._prismaService.seasonDriver.findFirst({
      where: {
        id: parent.seasonDriverId,
      },
    });
  }

  @ResolveField('eventSession', () => EventSession)
  async driver(@Parent() parent: SeasonDriverStandingEntry) {
    return this._prismaService.eventSession.findFirst({
      where: {
        id: parent.eventSessionId,
      },
    });
  }
}
