import { Resolver, Query } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { Series } from '../types/series.type';

@Resolver(Series)
export class SeriesResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Series])
  async series() {
    return this._prismaService.series.findMany();
  }
}
