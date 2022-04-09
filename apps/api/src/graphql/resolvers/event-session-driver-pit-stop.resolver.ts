import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionDriverPitStop } from '../models/event-session-driver-pit-stop.model';
import { AbstractResolver } from './abstract.resolver';
import { AllEventSessionDriverPitStopsArgs } from '../args/event-session-driver-pit-stop/all-event-session-driver-pit-stops.args';
import { CreateEventSessionDriverPitStopArgs } from '../args/event-session-driver-pit-stop/create-event-session-driver-pit-stop.args';
import { UpdateEventSessionDriverDriverPitStopArgs } from '../args/event-session-driver-pit-stop/update-event-session-driver-pit-stop.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

@Resolver(EventSessionDriverPitStop)
export class EventSessionDriverPitStopResolver extends AbstractResolver {
  @Query(() => EventSessionDriverPitStop)
  async EventSessionDriverPitStop(@Args() args: IdArgs) {
    return this._prismaService.eventSessionDriverPitStop.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [EventSessionDriverPitStop])
  async allEventSessionDriverPitStops(@Args() args: AllEventSessionDriverPitStopsArgs) {
    return this._prismaService.eventSessionDriverPitStop.findMany(await this.getAllArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allEventSessionDriverPitStopsMeta(@Args() args: AllEventSessionDriverPitStopsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionDriverPitStop.count(await this.getAllArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => EventSessionDriverPitStop)
  @UseGuards(GqlAuthGuard)
  async createEventSessionDriverPitStop(@Args() args: CreateEventSessionDriverPitStopArgs) {
    return this._prismaService.eventSessionDriverPitStop.create({
      data: args,
    });
  }

  @Mutation(() => EventSessionDriverPitStop)
  @UseGuards(GqlAuthGuard)
  async updateEventSessionDriverPitStop(@Args() args: UpdateEventSessionDriverDriverPitStopArgs) {
    return this._prismaService.eventSessionDriverPitStop.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => EventSessionDriverPitStop)
  @UseGuards(GqlAuthGuard)
  async deleteEventSessionDriverPitStop(@Args() args: IdArgs) {
    return this._prismaService.eventSessionDriverPitStop.delete({
      where: {
        id: args.id,
      },
    });
  }
}
