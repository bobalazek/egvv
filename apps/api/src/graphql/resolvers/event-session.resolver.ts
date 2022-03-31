import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { EventSessionTeamDriver } from '../types/event-session-team-driver.type';
import { EventSession } from '../types/event-session.type';
import { Event } from '../types/event.type';

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
