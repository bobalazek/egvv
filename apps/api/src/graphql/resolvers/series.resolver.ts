import { Resolver, Query, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { Season } from '../models/season.model';
import { Series } from '../models/series.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AbstractResolver } from './abstract.resolver';
import { IdArgs } from '../args/id.args';
import { AllSeriesArgs } from '../args/series/all-series.args';
import { CreateSeriesArgs } from '../args/series/create-series.args';
import { UpdateSeriesArgs } from '../args/series/update-series.args';

@Resolver(Series)
export class SeriesResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => Series)
  async Series(@Args() args: IdArgs) {
    return this._prismaService.series.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [Series])
  async allSeries(@Args() args: AllSeriesArgs) {
    return this._prismaService.series.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allSeriesMeta(@Args() args: AllSeriesArgs): Promise<ListMetadata> {
    const count = await this._prismaService.series.count();
    return {
      count,
    };
  }

  @Mutation(() => Series)
  async createSeries(@Args() args: CreateSeriesArgs) {
    return this._prismaService.series.create({
      data: args,
    });
  }

  @Mutation(() => Series)
  async updateSeries(@Args() args: UpdateSeriesArgs) {
    return this._prismaService.series.update({
      where: {
        id: args.id,
      },
      data: {
        slug: args.slug,
        name: args.name,
        url: args.url,
      },
    });
  }

  @Mutation(() => Series)
  async deleteSeries(@Args() args: IdArgs) {
    return this._prismaService.series.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('seasons', () => [Season])
  async seasons(@Parent() parent: Series) {
    return this._prismaService.season.findMany({
      where: {
        seriesId: parent.id,
      },
    });
  }
}
