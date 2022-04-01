import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { EventArgs } from '../args/event.args';
import { EventsArgs } from '../args/events.args';
import { Circuit } from '../models/circuit.model';
import { EventSession } from '../models/event-session.model';
import { Event } from '../models/event.model';
import { Season } from '../models/season.model';

@Resolver(Event)
export class EventResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Event])
  async allEvents(@Args() args: EventsArgs) {
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
        raceAt: 'desc',
      },
    });
  }

  @Query(() => Event)
  async Event(@Args() args: EventArgs) {
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
