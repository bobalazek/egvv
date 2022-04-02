import { Resolver, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllCircuitsArgs } from '../args/all-circuits.args';
import { Circuit } from '../models/circuit.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AbstractResolver } from './abstract.resolver';

@Resolver(Circuit)
export class CircuitResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => Circuit)
  async Circuit(@Args() args: IdArgs) {
    return this._prismaService.circuit.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [Circuit])
  async allCircuits(@Args() args: AllCircuitsArgs) {
    return this._prismaService.circuit.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allCircuitsMeta(@Args() args: AllCircuitsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.circuit.count();
    return {
      count,
    };
  }
}
