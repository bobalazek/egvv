import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllEventsArgs } from '../args/all-events.args';
import { Circuit } from '../models/circuit.model';
import { EventSession } from '../models/event-session.model';
import { Event } from '../models/event.model';
import { Season } from '../models/season.model';
import { AbstractResolver } from './abstract.resolver';
import { ListMetadata } from '../models/list-metadata.model';

@Resolver(Event)
export class EventResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => Event)
  async Event(@Args() args: IdArgs) {
    return this._prismaService.event.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [Event])
  async allEvents(@Args() args: AllEventsArgs) {
    return this._prismaService.event.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allEventsMeta(@Args() args: AllEventsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.event.count();
    return {
      count,
    };
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