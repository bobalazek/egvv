import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';

import { PrismaService } from '../services/prisma.service';
import { EventArgs } from '../args/event.args';
import { EventsArgs } from '../args/events.args';
import { Circuit } from '../types/circuit.type';
import { EventSession } from '../types/event-session.type';
import { Event } from '../types/event.type';
import { Season } from '../types/season.type';

@Resolver(Event)
export class EventResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Event])
  async events(@Args() args: EventsArgs) {
    return this._prismaService.event.findMany({
      skip: args.offset,
      take: args.limit,
      where: {
        season: {
          series: {
            slug: args.seriesSlug,
          },
        },
      },
      orderBy: {
        startAt: 'desc',
      },
    });
  }

  @Query(() => Event)
  async event(@Args() args: EventArgs) {
    return this._prismaService.event.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('season', () => Season)
  async season(@Parent() parent: Event) {
    return this._prismaService.season.findFirst({
      where: {
        id: parent.seasonId,
      },
    });
  }

  @ResolveField('circuit', () => Circuit)
  async circuit(@Parent() parent: Event) {
    return this._prismaService.circuit.findFirst({
      where: {
        id: parent.circuitId,
      },
    });
  }

  @ResolveField('eventSessions', () => [EventSession])
  async eventSessions(@Parent() parent: Event) {
    return this._prismaService.eventSession.findMany({
      where: {
        eventId: parseInt(parent.id),
      },
      orderBy: {
        startAt: 'asc',
      },
    });
  }
}
