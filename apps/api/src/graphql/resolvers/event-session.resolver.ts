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
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

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
    const prismaArgs = this.getAllArgs(args, false, ['name'], ['eventId']);

    const eventSeasonIds: string[] = [];
    if (args.filter?.seasonTeamId) {
      const seasonTeam = await this._prismaService.seasonTeam.findFirst({
        where: {
          id: args.filter.seasonTeamId,
        },
      });
      if (seasonTeam) {
        eventSeasonIds.push(seasonTeam.seasonId);
      }
    }
    if (args.filter?.seasonDriverId) {
      const seasonDriver = await this._prismaService.seasonDriver.findFirst({
        where: {
          id: args.filter.seasonDriverId,
        },
        include: {
          seasonTeam: true,
        },
      });
      if (seasonDriver) {
        eventSeasonIds.push(seasonDriver.seasonTeam.seasonId);
      }
    }

    if (eventSeasonIds.length) {
      if (!prismaArgs.where) {
        prismaArgs.where = {};
      }

      prismaArgs.where.event = {
        seasonId: {
          in: eventSeasonIds,
        },
      };
    }

    return this._prismaService.eventSession.findMany(prismaArgs);
  }

  @Query(() => ListMetadata)
  async _allEventSessionsMeta(@Args() args: AllEventSessionsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.eventSession.count(this.getAllArgs(args, true, [], ['eventId']));
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
