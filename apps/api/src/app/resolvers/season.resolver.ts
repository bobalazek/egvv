import { Resolver, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { SeasonArgs } from '../args/season.args';
import { Season } from '../types/season.type';

@Resolver(Season)
export class SeasonResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Season])
  async seasons(@Args() args: SeasonArgs) {
    return this._prismaService.season.findMany({
      where: {
        series: {
          slug: args.seriesSlug,
        },
      },
    });
  }
}
