import { Resolver, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { DriverArgs } from '../args/driver.args';
import { Driver } from '../types/driver.type';

@Resolver(Driver)
export class DriverResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Driver])
  async drivers(@Args() args: DriverArgs) {
    return this._prismaService.driver.findMany({
      skip: args.offset,
      take: args.limit,
    });
  }
}
