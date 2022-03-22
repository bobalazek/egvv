import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../services/prisma.service';
import { EventSessionTeamDriver } from '../types/event-session-team-driver.type';
import { EventSession } from '../types/event-session.type';
import { SeasonTeamDriver } from '../types/season-team-driver.type';
import { Vehicle } from '../types/vehicle.type';

@Resolver(EventSessionTeamDriver)
export class EventSessionTeamDriverResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @ResolveField('eventSession', () => EventSession)
  async eventSession(@Parent() parent: EventSessionTeamDriver) {
    return this._prismaService.eventSession.findFirst({
      where: {
        id: parent.eventSessionId,
      },
    });
  }

  @ResolveField('seasonTeamDriver', () => SeasonTeamDriver)
  async seasonTeamDriver(@Parent() parent: EventSessionTeamDriver) {
    return this._prismaService.seasonTeamDriver.findFirst({
      where: {
        id: parent.seasonTeamDriverId,
      },
    });
  }

  @ResolveField('vehicle', () => Vehicle)
  async vehicle(@Parent() parent: EventSessionTeamDriver) {
    return this._prismaService.vehicle.findFirst({
      where: {
        id: parent.vehicleId,
      },
    });
  }
}
