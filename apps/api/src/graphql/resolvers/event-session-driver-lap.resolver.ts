import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionDriverLap } from '../models/event-session-driver-lap.model';
import { AbstractResolver } from './abstract.resolver';
import { AllEventSessionDriverLapsArgs } from '../args/event-session-driver-lap/all-event-session-driver-laps.args';
import { CreateEventSessionDriverLapArgs } from '../args/event-session-driver-lap/create-event-session-driver-lap.args';
import { UpdateEventSessionDriverLapArgs } from '../args/event-session-driver-lap/update-event-session-driver-lap.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { EventSessionDriver } from '../models/event-session-driver.model';

@Resolver(EventSessionDriverLap)
export class EventSessionDriverLapResolver extends AbstractResolver {
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
    return this._prismaService.eventSessionDriverLap.findMany(await this.getPrismaArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allEventSessionDriverLapsMeta(@Args() args: AllEventSessionDriverLapsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionDriverLap.count(await this.getPrismaArgs(args, true));
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
  async updateEventSessionDriverLap(@Args() args: UpdateEventSessionDriverLapArgs) {
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

  @ResolveField('eventSessionDriver', () => EventSessionDriver)
  async eventSessionDriver(@Parent() parent: EventSessionDriverLap) {
    return this._prismaService.eventSessionDriver.findFirst({
      where: {
        id: parent.eventSessionDriverId,
      },
    });
  }
}
