import { Resolver, Query, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AbstractResolver } from './abstract.resolver';
import { IdArgs } from '../args/id.args';
import { AllSeasonsArgs } from '../args/season/all-seasons.args';
import { SeasonTeam } from '../models/season-team.model';
import { Season } from '../models/season.model';
import { Series } from '../models/series.model';
import { ListMetadata } from '../models/list-metadata.model';
import { CreateSeasonArgs } from '../args/season/create-season.args';
import { UpdateSeasonArgs } from '../args/season/update-season.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

@Resolver(Season)
export class SeasonResolver extends AbstractResolver {
  @Query(() => Season)
  async Season(@Args() args: IdArgs) {
    return this._prismaService.season.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [Season])
  async allSeasons(@Args() args: AllSeasonsArgs) {
    return this._prismaService.season.findMany(
      await this.getPrismaArgs(args, false, ['slug', 'name'], [{ filterField: 'seriesId' }])
    );
  }

  @Query(() => ListMetadata)
  async _allSeasonsMeta(@Args() args: AllSeasonsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.season.count(
      await this.getPrismaArgs(args, true, ['slug', 'name'], [{ filterField: 'seriesId' }])
    );
    return {
      count,
    };
  }

  @Mutation(() => Season)
  @UseGuards(GqlAuthGuard)
  async createSeason(@Args() args: CreateSeasonArgs) {
    return this._prismaService.season.create({
      data: args,
    });
  }

  @Mutation(() => Season)
  @UseGuards(GqlAuthGuard)
  async updateSeason(@Args() args: UpdateSeasonArgs) {
    return this._prismaService.season.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => Season)
  @UseGuards(GqlAuthGuard)
  async deleteSeason(@Args() args: IdArgs) {
    return this._prismaService.season.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('seasonTeams', () => [SeasonTeam])
  async seasonTeams(@Parent() parent: Season) {
    return this._prismaService.seasonTeam.findMany({
      where: {
        seasonId: parent.id,
      },
    });
  }

  @ResolveField('series', () => Series)
  async series(@Parent() parent: Season) {
    return this._prismaService.series.findFirst({
      where: {
        id: parent.seriesId,
      },
    });
  }
}
