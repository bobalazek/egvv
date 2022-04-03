import { Args, Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllVehiclesArgs } from '../args/all-vehicles.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { Vehicle } from '../models/vehicle.model';
import { AbstractResolver } from './abstract.resolver';

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
        id: parseInt(args.id),
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
}
