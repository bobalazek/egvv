import { Resolver, ResolveField, Parent, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionsArgs } from '../args/all-event-sessions.args';
import { IdArgs } from '../args/id.args';
import { EventSessionTeamDriver } from '../models/event-session-team-driver.model';
import { EventSession } from '../models/event-session.model';
import { Event } from '../models/event.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AbstractResolver } from './abstract.resolver';

@Resolver(EventSession)
export class EventSessionResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => EventSession)
  async EventSession(@Args() args: IdArgs) {
    return this._prismaService.eventSession.findFirst({
      where: {
        id: parseInt(args.id),
      },
    });
  }

  @Query(() => [EventSession])
  async allEventSessions(@Args() args: AllEventSessionsArgs) {
    return this._prismaService.eventSession.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allEventSessionsMeta(@Args() args: AllEventSessionsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.eventSession.count();
    return {
      count,
    };
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
