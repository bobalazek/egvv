import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { EventSessionTeamDriver } from '../models/event-session-team-driver.model';
import { EventSession } from '../models/event-session.model';
import { Event } from '../models/event.model';

@Resolver(EventSession)
export class EventSessionResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @ResolveField('event', () => Event)
  async event(@Parent() parent: EventSession) {
    return this._prismaService.event.findFirst({
      where: {
        id: parent.eventId,
      },
    });
  }

  @ResolveField('eventSessionTeamDrivers', () => [EventSessionTeamDriver])
  async eventSessionTeamDrivers(@Parent() parent: EventSession) {
    return this._prismaService.eventSessionTeamDriver.findMany({
      where: {
        eventSessionId: parseInt(parent.id),
      },
    });
  }
}
