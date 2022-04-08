import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionDriverLapsArgs } from '../args/event-session-driver-lap/all-event-session-driver-laps.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionDriverLap } from '../models/event-session-driver-lap.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateEventSessionDriverLapArgs } from '../args/event-session-driver-lap/create-event-session-driver-lap.args';
import { UpdateEventSessionDriverDriverLapArgs } from '../args/event-session-driver-lap/update-event-session-driver-lap.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

@Resolver(EventSessionDriverLap)
export class EventSessionDriverLapResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => EventSessionDriverLap)
  async EventSessionDriverLap(@Args() args: IdArgs) {
    return this._prismaService.eventSessionDriverLap.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [EventSessionDriverLap])
  async allEventSessionDriverLaps(@Args() args: AllEventSessionDriverLapsArgs) {
    return this._prismaService.eventSessionDriverLap.findMany(this.getAllArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allEventSessionDriverLapsMeta(@Args() args: AllEventSessionDriverLapsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionDriverLap.count(this.getAllArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => EventSessionDriverLap)
  @UseGuards(GqlAuthGuard)
  async createEventSessionDriverLap(@Args() args: CreateEventSessionDriverLapArgs) {
    return this._prismaService.eventSessionDriverLap.create({
      data: args,
    });
  }

  @Mutation(() => EventSessionDriverLap)
  @UseGuards(GqlAuthGuard)
  async updateEventSessionDriverLap(@Args() args: UpdateEventSessionDriverDriverLapArgs) {
    return this._prismaService.eventSessionDriverLap.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => EventSessionDriverLap)
  @UseGuards(GqlAuthGuard)
  async deleteEventSessionDriverLap(@Args() args: IdArgs) {
    return this._prismaService.eventSessionDriverLap.delete({
      where: {
        id: args.id,
      },
    });
  }
}
