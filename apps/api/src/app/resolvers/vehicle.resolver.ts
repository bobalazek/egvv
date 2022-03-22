import { Resolver } from '@nestjs/graphql';

import { PrismaService } from '../services/prisma.service';
import { Vehicle } from '../types/vehicle.type';

@Resolver(Vehicle)
export class VehicleResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  // TODO: do we need any ResolveField's?
}
