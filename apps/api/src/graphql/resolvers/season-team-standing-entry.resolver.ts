import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PrismaService } from '../../app/services/prisma.service';
import { SeasonTeamStandingEntry } from '../models/season-team-standing-entry.model';
import { EventSession } from '../models/event-session.model';
import { SeasonTeam } from '../models/season-team.model';
import { AbstractResolver } from './abstract.resolver';
import { IdArgs } from '../args/id.args';
import { AllSeasonTeamStandingEntriesArgs } from '../args/season-team-standing-entry/all-season-team-standing-entries.args';
import { ListMetadata } from '../models/list-metadata.model';
import { CreateSeasonTeamStandingEntryArgs } from '../args/season-team-standing-entry/create-season-team-standing-entry.args';
import { UpdateSeasonTeamStandingEntryArgs } from '../args/season-team-standing-entry/update-season-team-standing-entry.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

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
    return this._prismaService.seasonTeamStandingEntry.findMany(this.getAllArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allSeasonTeamStandingEntriesMeta(@Args() args: AllSeasonTeamStandingEntriesArgs): Promise<ListMetadata> {
    const count = await this._prismaService.seasonTeamStandingEntry.count(this.getAllArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => SeasonTeamStandingEntry)
  @UseGuards(GqlAuthGuard)
  async createSeasonTeamStandingEntry(@Args() args: CreateSeasonTeamStandingEntryArgs) {
    return this._prismaService.seasonTeamStandingEntry.create({
      data: args,
    });
  }

  @Mutation(() => SeasonTeamStandingEntry)
  @UseGuards(GqlAuthGuard)
  async updateSeasonTeamStandingEntry(@Args() args: UpdateSeasonTeamStandingEntryArgs) {
    return this._prismaService.seasonTeamStandingEntry.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => SeasonTeamStandingEntry)
  @UseGuards(GqlAuthGuard)
  async deleteSeasonTeamStandingEntry(@Args() args: IdArgs) {
    return this._prismaService.seasonTeamStandingEntry.delete({
      where: {
        id: args.id,
      },
    });
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
