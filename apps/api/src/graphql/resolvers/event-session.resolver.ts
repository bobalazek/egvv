import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionsArgs } from '../args/event-session/all-event-sessions.args';
import { CreateEventSessionArgs } from '../args/event-session/create-event-session.args';
import { UpdateEventSessionArgs } from '../args/event-session/update-event-session.args';
import { IdArgs } from '../args/id.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { EventSessionDriver } from '../models/event-session-driver.model';
import { EventSession } from '../models/event-session.model';
import { Event } from '../models/event.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AbstractResolver } from './abstract.resolver';

@Resolver(EventSession)
export class EventSessionResolver extends AbstractResolver {
  @Query(() => EventSession)
  async EventSession(@Args() args: IdArgs) {
    return this._prismaService.eventSession.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [EventSession])
  async allEventSessions(@Args() args: AllEventSessionsArgs) {
    const prismaArgs = await this.getAllArgs(
      args,
      false,
      ['slug', 'name'],
      [
        'eventId',
        { filterField: 'seasonTeamId', baseModel: 'seasonTeam', model: 'event', modelField: 'seasonId' },
        {
          filterField: 'seasonDriverId',
          baseModel: 'seasonDriver',
          model: 'event',
          modelField: 'seasonId',
          modelFieldParent: 'seasonTeam',
        },
      ]
    );

    return this._prismaService.eventSession.findMany(prismaArgs);
  }

  @Query(() => ListMetadata)
  async _allEventSessionsMeta(@Args() args: AllEventSessionsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.eventSession.count(
      await this.getAllArgs(
        args,
        true,
        [],
        [
          'eventId',
          { filterField: 'seasonTeamId', baseModel: 'seasonTeam', model: 'event', modelField: 'seasonId' },
          {
            filterField: 'seasonDriverId',
            baseModel: 'seasonDriver',
            model: 'event',
            modelField: 'seasonId',
            modelFieldParent: 'seasonTeam',
          },
        ]
      )
    );
    return {
      count,
    };
  }

  @Mutation(() => EventSession)
  @UseGuards(GqlAuthGuard)
  async createEventSession(@Args() args: CreateEventSessionArgs) {
    return this._prismaService.eventSession.create({
      data: args,
    });
  }

  @Mutation(() => EventSession)
  @UseGuards(GqlAuthGuard)
  async updateEventSession(@Args() args: UpdateEventSessionArgs) {
    return this._prismaService.eventSession.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => EventSession)
  @UseGuards(GqlAuthGuard)
  async deleteEventSession(@Args() args: IdArgs) {
    return this._prismaService.event.delete({
      where: {
        id: args.id,
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

  @ResolveField('eventSessionDrivers', () => [EventSessionDriver])
  async eventSessionDrivers(@Parent() parent: EventSession) {
    return this._prismaService.eventSessionDriver.findMany({
      where: {
        eventSessionId: parent.id,
      },
    });
  }
}
