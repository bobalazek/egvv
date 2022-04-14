import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionDriverStartingGrid } from '../models/event-session-driver-starting-grid.model';
import { AbstractResolver } from './abstract.resolver';
import { AllEventSessionDriverStartingGridsArgs } from '../args/event-session-driver-starting-grid/all-event-session-driver-starting-grids.args';
import { CreateEventSessionDriverStartingGridArgs } from '../args/event-session-driver-starting-grid/create-event-session-driver-starting-grid.args';
import { UpdateEventSessionDriverDriverStartingGridArgs } from '../args/event-session-driver-starting-grid/update-event-session-driver-starting-grid.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { EventSessionDriver } from '../models/event-session-driver.model';

@Resolver(EventSessionDriverStartingGrid)
export class EventSessionDriverStartingGridResolver extends AbstractResolver {
  @Query(() => EventSessionDriverStartingGrid)
  async EventSessionDriverStartingGrid(@Args() args: IdArgs) {
    return this._prismaService.eventSessionDriverStartingGrid.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [EventSessionDriverStartingGrid])
  async allEventSessionDriverStartingGrids(@Args() args: AllEventSessionDriverStartingGridsArgs) {
    return this._prismaService.eventSessionDriverStartingGrid.findMany(await this.getAllArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allEventSessionDriverStartingGridsMeta(
    @Args() args: AllEventSessionDriverStartingGridsArgs
  ): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionDriverStartingGrid.count(await this.getAllArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => EventSessionDriverStartingGrid)
  @UseGuards(GqlAuthGuard)
  async createEventSessionDriverStartingGrid(@Args() args: CreateEventSessionDriverStartingGridArgs) {
    return this._prismaService.eventSessionDriverStartingGrid.create({
      data: args,
    });
  }

  @Mutation(() => EventSessionDriverStartingGrid)
  @UseGuards(GqlAuthGuard)
  async updateEventSessionDriverStartingGrid(@Args() args: UpdateEventSessionDriverDriverStartingGridArgs) {
    return this._prismaService.eventSessionDriverStartingGrid.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => EventSessionDriverStartingGrid)
  @UseGuards(GqlAuthGuard)
  async deleteEventSessionDriverStartingGrid(@Args() args: IdArgs) {
    return this._prismaService.eventSessionDriverStartingGrid.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('eventSessionDriver', () => EventSessionDriver)
  async eventSessionDriver(@Parent() parent: EventSessionDriverStartingGrid) {
    return this._prismaService.eventSessionDriver.findFirst({
      where: {
        id: parent.eventSessionDriverId,
      },
    });
  }
}
