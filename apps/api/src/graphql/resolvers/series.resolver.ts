import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllSeriesArgs } from '../args/all-series.args';
import { Season } from '../models/season.model';
import { Series } from '../models/series.model';
import { ListMetadata } from '../models/list-metadata.model';

@Resolver(Series)
export class SeriesResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
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
    return this._prismaService.series.findMany({
      skip: args.page * args.perPage,
      take: args.perPage,
    });
  }

  @Query(() => ListMetadata)
  async _allSeriesMeta(@Args() args: AllSeriesArgs): Promise<ListMetadata> {
    const count = await this._prismaService.series.count();
    return {
      count,
    };
  }

  @ResolveField('seasons', () => [Season])
  async seasons(@Parent() parent: Series) {
    return this._prismaService.season.findMany({
      where: {
        seriesId: parseInt(parent.id),
      },
    });
  }
}
