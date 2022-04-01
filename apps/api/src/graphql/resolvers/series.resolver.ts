import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { SeriesArgs } from '../args/series.args';
import { AllSeriesArgs } from '../args/all-series.args';
import { Season } from '../models/season.model';
import { Series } from '../models/series.model';

@Resolver(Series)
export class SeriesResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Series])
  async allSeries(@Args() args: AllSeriesArgs) {
    return this._prismaService.series.findMany({
      skip: args.offset,
      take: args.limit,
    });
  }

  @Query(() => Series)
  async Series(@Args() args: SeriesArgs) {
    return this._prismaService.series.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('seasons', () => [Season], { nullable: true })
  async seasons(@Parent() parent: Series) {
    return this._prismaService.season.findFirst({
      where: {
        seriesId: parseInt(parent.id),
      },
    });
  }
}
