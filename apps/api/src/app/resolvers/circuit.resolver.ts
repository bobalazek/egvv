import { Resolver, Query } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { Circuit } from '../types/circuit.type';

@Resolver(Circuit)
export class CircuitResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Circuit])
  async circuits() {
    return this._prismaService.circuit.findMany();
  }
}
