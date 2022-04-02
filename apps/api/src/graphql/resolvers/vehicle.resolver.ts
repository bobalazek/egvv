import { Args, Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllVehiclesArgs } from '../args/all-vehicles.args';
import { IdArgs } from '../args/id.args';
import { Vehicle } from '../models/vehicle.model';

@Resolver(Vehicle)
export class VehicleResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Vehicle])
  async allVehicles(@Args() args: AllVehiclesArgs) {
    return this._prismaService.vehicle.findMany({
      skip: args.page * args.perPage,
      take: args.perPage,
    });
  }

  @Query(() => Vehicle)
  async Vehicle(@Args() args: IdArgs) {
    return this._prismaService.vehicle.findFirst({
      where: {
        id: args.id,
      },
    });
  }
}
