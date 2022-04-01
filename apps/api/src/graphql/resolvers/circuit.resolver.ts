import { Resolver, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllCircuitsArgs } from '../args/all-circuits.args';
import { Circuit } from '../models/circuit.model';

@Resolver(Circuit)
export class CircuitResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Circuit])
  async allCircuits(@Args() args: AllCircuitsArgs) {
    return this._prismaService.circuit.findMany({
      skip: (args.page - 1) * args.perPage + 1,
      take: args.perPage,
    });
  }

  @Query(() => Circuit)
  async Circuit(@Args() args: IdArgs) {
    return this._prismaService.circuit.findFirst({
      where: {
        id: args.id,
      },
    });
  }
}
