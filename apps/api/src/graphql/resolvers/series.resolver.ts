import { Resolver, Query, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AbstractResolver } from './abstract.resolver';
import { Season } from '../models/season.model';
import { Series } from '../models/series.model';
import { ListMetadata } from '../models/list-metadata.model';
import { IdArgs } from '../args/id.args';
import { SlugArgs } from '../args/slug.args';
import { AllSeriesArgs } from '../args/series/all-series.args';
import { CreateSeriesArgs } from '../args/series/create-series.args';
import { UpdateSeriesArgs } from '../args/series/update-series.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { AllSeasonsArgs } from '../args/season/all-seasons.args';

@Resolver(Series)
export class SeriesResolver extends AbstractResolver {
  @Query(() => Series)
  async Series(@Args() args: IdArgs) {
    return this._prismaService.series.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => Series)
  async SeriesBySlug(@Args() args: SlugArgs) {
    return this._prismaService.series.findFirst({
      where: {
        slug: args.slug,
      },
    });
  }

  @Query(() => [Series])
  async allSeries(@Args() args: AllSeriesArgs) {
    return this._prismaService.series.findMany(await this.getPrismaArgs(args, false, ['slug', 'name']));
  }

  @Query(() => ListMetadata)
  async _allSeriesMeta(@Args() args: AllSeriesArgs): Promise<ListMetadata> {
    const count = await this._prismaService.series.count(await this.getPrismaArgs(args, true, ['slug', 'name']));
    return {
      count,
    };
  }

  @Mutation(() => Series)
  @UseGuards(GqlAuthGuard)
  async createSeries(@Args() args: CreateSeriesArgs) {
    return this._prismaService.series.create({
      data: args,
    });
  }

  @Mutation(() => Series)
  @UseGuards(GqlAuthGuard)
  async updateSeries(@Args() args: UpdateSeriesArgs) {
    return this._prismaService.series.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => Series)
  @UseGuards(GqlAuthGuard)
  async deleteSeries(@Args() args: IdArgs) {
    return this._prismaService.series.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('seasons', () => [Season])
  async seasons(@Parent() parent: Series, @Args() args: AllSeasonsArgs) {
    if (!args.sortField) {
      args.sortField = 'startAt';
    }
    if (!args.sortOrder) {
      args.sortOrder = 'desc';
    }

    const prismaArgs = await this.getPrismaArgs(args, false, ['slug', 'name']);
    if (!prismaArgs.where) {
      prismaArgs.where = {};
    }
    prismaArgs.where.seriesId = parent.id;

    return this._prismaService.season.findMany(prismaArgs);
  }
}
