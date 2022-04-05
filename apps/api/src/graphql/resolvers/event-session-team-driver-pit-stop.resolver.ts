import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionTeamDriverPitStopsArgs } from '../args/event-session-team-driver-pit-stop/all-event-session-team-driver-pit-stops.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionTeamDriverPitStop } from '../models/event-session-team-driver-pit-stop.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateEventSessionTeamDriverPitStopArgs } from '../args/event-session-team-driver-pit-stop/create-event-session-team-driver-pit-stop.args';
import { UpdateEventSessionTeamDriverDriverPitStopArgs } from '../args/event-session-team-driver-pit-stop/update-event-session-team-driver-pit-stop.args';

@Resolver(EventSessionTeamDriverPitStop)
export class EventSessionTeamDriverPitStopResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => EventSessionTeamDriverPitStop)
  async EventSessionTeamDriverPitStop(@Args() args: IdArgs) {
    return this._prismaService.eventSessionTeamDriverPitStop.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [EventSessionTeamDriverPitStop])
  async allEventSessionTeamDriverPitStops(@Args() args: AllEventSessionTeamDriverPitStopsArgs) {
    return this._prismaService.eventSessionTeamDriverPitStop.findMany(this.getAllArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allEventSessionTeamDriverPitStopsMeta(
    @Args() args: AllEventSessionTeamDriverPitStopsArgs
  ): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionTeamDriverPitStop.count(this.getAllArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => EventSessionTeamDriverPitStop)
  async createEventSessionTeamDriverPitStop(@Args() args: CreateEventSessionTeamDriverPitStopArgs) {
    return this._prismaService.eventSessionTeamDriverPitStop.create({
      data: args,
    });
  }

  @Mutation(() => EventSessionTeamDriverPitStop)
  async updateEventSessionTeamDriverPitStop(@Args() args: UpdateEventSessionTeamDriverDriverPitStopArgs) {
    return this._prismaService.eventSessionTeamDriverPitStop.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => EventSessionTeamDriverPitStop)
  async deleteEventSessionTeamDriverPitStop(@Args() args: IdArgs) {
    return this._prismaService.eventSessionTeamDriverPitStop.delete({
      where: {
        id: args.id,
      },
    });
  }
}
