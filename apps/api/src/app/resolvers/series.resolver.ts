import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { SeriesSingleArgs } from '../args/series-single.args';
import { SeriesArgs } from '../args/series.args';
import { Season } from '../types/season.type';
import { Series } from '../types/series.type';

@Resolver(Series)
export class SeriesResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Series])
  async series(@Args() args: SeriesArgs) {
    return this._prismaService.series.findMany({
      skip: args.offset,
      take: args.limit,
    });
  }

  @Query(() => Series)
  async seriesSingle(@Args() args: SeriesSingleArgs) {
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
