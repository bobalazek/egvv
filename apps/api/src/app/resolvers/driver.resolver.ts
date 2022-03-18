import { Resolver, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { PaginationArgs } from '../args/pagination.args';
import { Driver } from '../types/driver.type';

@Resolver(Driver)
export class DriverResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Driver])
  async drivers(@Args() pagination: PaginationArgs) {
    return this._prismaService.driver.findMany({
      skip: pagination.offset,
      take: pagination.limit,
    });
  }
}
