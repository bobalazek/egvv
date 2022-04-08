import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionDriverPitStopsArgs } from '../args/event-session-driver-pit-stop/all-event-session-driver-pit-stops.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionDriverPitStop } from '../models/event-session-driver-pit-stop.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateEventSessionDriverPitStopArgs } from '../args/event-session-driver-pit-stop/create-event-session-driver-pit-stop.args';
import { UpdateEventSessionDriverDriverPitStopArgs } from '../args/event-session-driver-pit-stop/update-event-session-driver-pit-stop.args';

@Resolver(EventSessionDriverPitStop)
export class EventSessionDriverPitStopResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

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
    return this._prismaService.eventSessionDriverPitStop.findMany(this.getAllArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allEventSessionDriverPitStopsMeta(@Args() args: AllEventSessionDriverPitStopsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionDriverPitStop.count(this.getAllArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => EventSessionDriverPitStop)
  async createEventSessionDriverPitStop(@Args() args: CreateEventSessionDriverPitStopArgs) {
    return this._prismaService.eventSessionDriverPitStop.create({
      data: args,
    });
  }

  @Mutation(() => EventSessionDriverPitStop)
  async updateEventSessionDriverPitStop(@Args() args: UpdateEventSessionDriverDriverPitStopArgs) {
    return this._prismaService.eventSessionDriverPitStop.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => EventSessionDriverPitStop)
  async deleteEventSessionDriverPitStop(@Args() args: IdArgs) {
    return this._prismaService.eventSessionDriverPitStop.delete({
      where: {
        id: args.id,
      },
    });
  }
}
