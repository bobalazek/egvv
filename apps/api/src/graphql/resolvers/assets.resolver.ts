import { Resolver, Query } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { TeamVehicleAsset } from '../models/assets/team-vehicle-asset.model';
import { AbstractResolver } from './abstract.resolver';

@Resolver()
export class AssetsResolver extends AbstractResolver {
  constructor(prismaService: PrismaService) {
    super(prismaService);
  }

  @Query(() => [TeamVehicleAsset])
  async teamVehicleAssets() {
    return [];
  }
}
