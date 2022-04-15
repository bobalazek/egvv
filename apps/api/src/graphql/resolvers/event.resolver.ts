import { Resolver, Query, Args, Parent, ResolveField, Mutation } from '@nestjs/graphql';

import { IdArgs } from '../args/id.args';
import { Circuit } from '../models/circuit.model';
import { EventSession } from '../models/event-session.model';
import { Event } from '../models/event.model';
import { Season } from '../models/season.model';
import { AbstractResolver } from './abstract.resolver';
import { ListMetadata } from '../models/list-metadata.model';
import { AllEventsArgs } from '../args/event/all-events.args';
import { CreateEventArgs } from '../args/event/create-event.args';
import { UpdateEventArgs } from '../args/event/update-event.args';
import { AllEventSessionsArgs } from '../args/event-session/all-event-sessions.args';

@Resolver(Event)
export class EventResolver extends AbstractResolver {
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
    return this._prismaService.event.findMany(await this.getPrismaArgs(args, false, ['slug', 'name']));
  }

  @Query(() => ListMetadata)
  async _allEventsMeta(@Args() args: AllEventsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.event.count(await this.getPrismaArgs(args, true, ['slug', 'name']));
    return {
      count,
    };
  }

  @Mutation(() => Event)
  async createEvent(@Args() args: CreateEventArgs) {
    return this._prismaService.event.create({
      data: args,
    });
  }

  @Mutation(() => Event)
  async updateEvent(@Args() args: UpdateEventArgs) {
    return this._prismaService.event.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => Event)
  async deleteEvent(@Args() args: IdArgs) {
    return this._prismaService.event.delete({
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
  async eventSessions(@Parent() parent: Event, @Args() args: AllEventSessionsArgs) {
    if (!args.sortField) {
      args.sortField = 'startAt';
    }
    if (!args.sortOrder) {
      args.sortOrder = 'asc';
    }

    const prismaArgs = await this.getPrismaArgs(args, false, ['slug', 'name', 'type']);
    if (!prismaArgs.where) {
      prismaArgs.where = {};
    }
    prismaArgs.where.eventId = parent.id;

    return this._prismaService.eventSession.findMany(prismaArgs);
  }
}
