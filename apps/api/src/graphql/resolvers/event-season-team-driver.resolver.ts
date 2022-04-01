import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { EventSessionTeamDriver } from '../models/event-session-team-driver.model';
import { EventSession } from '../models/event-session.model';
import { SeasonTeamDriver } from '../models/season-team-driver.model';
import { Vehicle } from '../models/vehicle.model';

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
