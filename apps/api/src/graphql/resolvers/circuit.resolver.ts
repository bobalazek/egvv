import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllCircuitsArgs } from '../args/circuit/all-circuits.args';
import { Circuit } from '../models/circuit.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateCircuitArgs } from '../args/circuit/create-circuit.args';
import { UpdateCircuitArgs } from '../args/circuit/update-circuit.args';

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
    return this._prismaService.circuit.findMany(
      this.getAllArgs(args, false, ['slug', 'name', 'location', 'countryCode'])
    );
  }

  @Query(() => ListMetadata)
  async _allCircuitsMeta(@Args() args: AllCircuitsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.circuit.count(
      this.getAllArgs(args, true, ['slug', 'name', 'location', 'countryCode'])
    );
    return {
      count,
    };
  }

  @Mutation(() => Circuit)
  async createCircuit(@Args() args: CreateCircuitArgs) {
    return this._prismaService.circuit.create({
      data: args,
    });
  }

  @Mutation(() => Circuit)
  async updateCircuit(@Args() args: UpdateCircuitArgs) {
    return this._prismaService.circuit.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => Circuit)
  async deleteCircuit(@Args() args: IdArgs) {
    return this._prismaService.circuit.delete({
      where: {
        id: args.id,
      },
    });
  }
}
