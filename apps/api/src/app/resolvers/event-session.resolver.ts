import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { EventSessionArgs } from '../args/event-session.args';
import { EventSession } from '../types/event-session.type';
import { Event } from '../types/event.type';

@Resolver(EventSession)
export class EventSessionResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [EventSession])
  async eventSessions(@Args() args: EventSessionArgs) {
    return this._prismaService.eventSession.findMany({
      where: {
        event: {
          slug: args.eventSlug,
        },
      },
    });
  }

  @ResolveField('event', () => Event)
  async event(@Parent() parent: EventSession) {
    return this._prismaService.event.findFirst({
      where: {
        id: parent.eventId,
      },
    });
  }
}
