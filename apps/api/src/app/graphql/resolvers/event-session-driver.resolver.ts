import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { IdArgs } from '../args/id.args';
import { AllEventSessionDriversArgs } from '../args/event-session-driver/all-event-session-drivers.args';
import { CreateEventSessionDriverArgs } from '../args/event-session-driver/create-event-session-driver.args';
import { UpdateEventSessionDriverDriverArgs } from '../args/event-session-driver/update-event-session-driver.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { EventSessionDriver } from '../models/event-session-driver.model';
import { EventSession } from '../models/event-session.model';
import { ListMetadata } from '../models/list-metadata.model';
import { SeasonDriver } from '../models/season-driver.model';
import { AbstractResolver } from './abstract.resolver';

@Resolver(EventSessionDriver)
export class EventSessionDriverResolver extends AbstractResolver {
  @Query(() => EventSessionDriver)
  async EventSessionDriver(@Args() args: IdArgs) {
    return this._prismaService.eventSessionDriver.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [EventSessionDriver])
  async allEventSessionDrivers(@Args() args: AllEventSessionDriversArgs) {
    return this._prismaService.eventSessionDriver.findMany(await this.getPrismaArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allEventSessionDriversMeta(@Args() args: AllEventSessionDriversArgs): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionDriver.count(await this.getPrismaArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => EventSessionDriver)
  @UseGuards(GqlAuthGuard)
  async createEventSessionDriver(@Args() args: CreateEventSessionDriverArgs) {
    return this._prismaService.eventSessionDriver.create({
      data: args,
    });
  }

  @Mutation(() => EventSessionDriver)
  @UseGuards(GqlAuthGuard)
  async updateEventSessionDriver(@Args() args: UpdateEventSessionDriverDriverArgs) {
    return this._prismaService.eventSessionDriver.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => EventSessionDriver)
  @UseGuards(GqlAuthGuard)
  async deleteEventSessionDriver(@Args() args: IdArgs) {
    return this._prismaService.eventSessionDriver.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('name', () => String)
  async name(@Parent() parent: EventSessionDriver) {
    const seasonDriver = await this._prismaService.seasonDriver.findFirst({
      where: {
        id: parent.seasonDriverId,
      },
    });
    const eventSession = await this._prismaService.eventSession.findFirst({
      where: {
        id: parent.eventSessionId,
      },
    });

    return `${seasonDriver.code} (${seasonDriver.number}) @ ${eventSession.name}`;
  }

  @ResolveField('eventSession', () => EventSession)
  async eventSession(@Parent() parent: EventSessionDriver) {
    return this._prismaService.eventSession.findFirst({
      where: {
        id: parent.eventSessionId,
      },
    });
  }

  @ResolveField('seasonDriver', () => SeasonDriver)
  async seasonDriver(@Parent() parent: EventSessionDriver) {
    return this._prismaService.seasonDriver.findFirst({
      where: {
        id: parent.seasonDriverId,
      },
    });
  }
}
