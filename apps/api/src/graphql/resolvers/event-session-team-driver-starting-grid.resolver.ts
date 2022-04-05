import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionTeamDriverStartingGridsArgs } from '../args/event-session-team-driver-starting-grid/all-event-session-team-driver-starting-grids.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionTeamDriverStartingGrid } from '../models/event-session-team-driver-starting-grid.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateEventSessionTeamDriverStartingGridArgs } from '../args/event-session-team-driver-starting-grid/create-event-session-team-driver-starting-grid.args';
import { UpdateEventSessionTeamDriverDriverStartingGridArgs } from '../args/event-session-team-driver-starting-grid/update-event-session-team-driver-starting-grid.args';

@Resolver(EventSessionTeamDriverStartingGrid)
export class EventSessionTeamDriverStartingGridResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => EventSessionTeamDriverStartingGrid)
  async EventSessionTeamDriverStartingGrid(@Args() args: IdArgs) {
    return this._prismaService.eventSessionTeamDriverStartingGrid.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [EventSessionTeamDriverStartingGrid])
  async allEventSessionTeamDriverStartingGrids(@Args() args: AllEventSessionTeamDriverStartingGridsArgs) {
    return this._prismaService.eventSessionTeamDriverStartingGrid.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allEventSessionTeamDriverStartingGridsMeta(
    @Args() args: AllEventSessionTeamDriverStartingGridsArgs
  ): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionTeamDriverStartingGrid.count();
    return {
      count,
    };
  }

  @Mutation(() => EventSessionTeamDriverStartingGrid)
  async createEventSessionTeamDriverStartingGrid(@Args() args: CreateEventSessionTeamDriverStartingGridArgs) {
    return this._prismaService.eventSessionTeamDriverStartingGrid.create({
      data: args,
    });
  }

  @Mutation(() => EventSessionTeamDriverStartingGrid)
  async updateEventSessionTeamDriverStartingGrid(@Args() args: UpdateEventSessionTeamDriverDriverStartingGridArgs) {
    return this._prismaService.eventSessionTeamDriverStartingGrid.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => EventSessionTeamDriverStartingGrid)
  async deleteEventSessionTeamDriverStartingGrid(@Args() args: IdArgs) {
    return this._prismaService.eventSessionTeamDriverStartingGrid.delete({
      where: {
        id: args.id,
      },
    });
  }
}
