import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllVehiclesArgs } from '../args/vehicle/all-vehicles.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { Vehicle } from '../models/vehicle.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateVehicleArgs } from '../args/vehicle/create-vehicle.args';
import { UpdateVehicleArgs } from '../args/vehicle/update-team.args';

@Resolver(Vehicle)
export class VehicleResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => Vehicle)
  async Vehicle(@Args() args: IdArgs) {
    return this._prismaService.vehicle.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [Vehicle])
  async allVehicles(@Args() args: AllVehiclesArgs) {
    return this._prismaService.vehicle.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allVehiclesMeta(@Args() args: AllVehiclesArgs): Promise<ListMetadata> {
    const count = await this._prismaService.vehicle.count();
    return {
      count,
    };
  }

  @Mutation(() => Vehicle)
  async createVehicle(@Args() args: CreateVehicleArgs) {
    return this._prismaService.vehicle.create({
      data: args,
    });
  }

  @Mutation(() => Vehicle)
  async updateVehicle(@Args() args: UpdateVehicleArgs) {
    return this._prismaService.vehicle.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => Vehicle)
  async deleteVehicle(@Args() args: IdArgs) {
    return this._prismaService.vehicle.delete({
      where: {
        id: args.id,
      },
    });
  }
}
