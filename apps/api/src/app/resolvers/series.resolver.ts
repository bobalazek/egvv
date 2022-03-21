import { Resolver, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { SeriesArgs } from '../args/series.args';
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
}
