import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AbstractResolver } from './abstract.resolver';
import { IdArgs } from '../args/id.args';
import { SeasonDriverStandingEntry } from '../models/season-driver-standing-entry.model';
import { EventSession } from '../models/event-session.model';
import { SeasonTeam } from '../models/season-team.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AllSeasonDriverStandingEntriesArgs } from '../args/season-driver-standing-entry/all-season-driver-standing-entries.args';
import { CreateSeasonDriverStandingEntryArgs } from '../args/season-driver-standing-entry/create-season-driver-standing-entry.args';
import { UpdateSeasonDriverStandingEntryArgs } from '../args/season-driver-standing-entry/update-season-driver-standing-entry.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

@Resolver(SeasonDriverStandingEntry)
export class SeasonDriverStandingEntryResolver extends AbstractResolver {
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
    return this._prismaService.seasonDriverStandingEntry.findMany(await this.getPrismaArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allSeasonDriverStandingEntriesMeta(@Args() args: AllSeasonDriverStandingEntriesArgs): Promise<ListMetadata> {
    const count = await this._prismaService.seasonDriverStandingEntry.count(await this.getPrismaArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => SeasonDriverStandingEntry)
  @UseGuards(GqlAuthGuard)
  async createSeasonDriverStandingEntry(@Args() args: CreateSeasonDriverStandingEntryArgs) {
    return this._prismaService.seasonDriverStandingEntry.create({
      data: args,
    });
  }

  @Mutation(() => SeasonDriverStandingEntry)
  @UseGuards(GqlAuthGuard)
  async updateSeasonDriverStandingEntry(@Args() args: UpdateSeasonDriverStandingEntryArgs) {
    return this._prismaService.seasonDriverStandingEntry.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => SeasonDriverStandingEntry)
  @UseGuards(GqlAuthGuard)
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
