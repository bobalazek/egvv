import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllSeriesArgs } from '../args/all-series.args';
import { Season } from '../models/season.model';
import { Series } from '../models/series.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AbstractResolver } from './abstract.resolver';

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

  @ResolveField('seasons', () => [Season])
  async seasons(@Parent() parent: Series) {
    return this._prismaService.season.findMany({
      where: {
        seriesId: parseInt(parent.id),
      },
    });
  }
}
