import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionTeamDriverLapsArgs } from '../args/event-session-team-driver-lap/all-event-session-team-driver-laps.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionTeamDriverLap } from '../models/event-session-team-driver-lap.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateEventSessionTeamDriverLapArgs } from '../args/event-session-team-driver-lap/create-event-session-team-driver-lap.args';
import { UpdateEventSessionTeamDriverDriverLapArgs } from '../args/event-session-team-driver-lap/update-event-session-team-driver-lap.args';

@Resolver(EventSessionTeamDriverLap)
export class EventSessionTeamDriverLapResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => EventSessionTeamDriverLap)
  async EventSessionTeamDriverLap(@Args() args: IdArgs) {
    return this._prismaService.eventSessionTeamDriverLap.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [EventSessionTeamDriverLap])
  async allEventSessionTeamDriverLaps(@Args() args: AllEventSessionTeamDriverLapsArgs) {
    return this._prismaService.eventSessionTeamDriverLap.findMany(this.getAllArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allEventSessionTeamDriverLapsMeta(@Args() args: AllEventSessionTeamDriverLapsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionTeamDriverLap.count(this.getAllArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => EventSessionTeamDriverLap)
  async createEventSessionTeamDriverLap(@Args() args: CreateEventSessionTeamDriverLapArgs) {
    return this._prismaService.eventSessionTeamDriverLap.create({
      data: args,
    });
  }

  @Mutation(() => EventSessionTeamDriverLap)
  async updateEventSessionTeamDriverLap(@Args() args: UpdateEventSessionTeamDriverDriverLapArgs) {
    return this._prismaService.eventSessionTeamDriverLap.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => EventSessionTeamDriverLap)
  async deleteEventSessionTeamDriverLap(@Args() args: IdArgs) {
    return this._prismaService.eventSessionTeamDriverLap.delete({
      where: {
        id: args.id,
      },
    });
  }
}
