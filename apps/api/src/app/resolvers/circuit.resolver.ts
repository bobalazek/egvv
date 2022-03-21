import { Resolver, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { CircuitArgs } from '../args/circuit.args';
import { CircuitsArgs } from '../args/circuits.args';
import { Circuit } from '../types/circuit.type';

@Resolver(Circuit)
export class CircuitResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Circuit])
  async circuits(@Args() args: CircuitsArgs) {
    return this._prismaService.circuit.findMany({
      skip: args.offset,
      take: args.limit,
    });
  }

  @Query(() => Circuit)
  async circuit(@Args() args: CircuitArgs) {
    return this._prismaService.circuit.findFirst({
      where: {
        id: args.id,
      },
    });
  }
}
