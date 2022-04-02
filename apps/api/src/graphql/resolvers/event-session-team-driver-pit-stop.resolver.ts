import { Resolver, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionTeamDriverPitStopsArgs } from '../args/all-event-session-team-driver-pit-stops.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionTeamDriverPitStop } from '../models/event-session-team-driver-pit-stop.model';
import { AbstractResolver } from './abstract.resolver';

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
    return this._prismaService.eventSessionTeamDriverPitStop.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allEventSessionTeamDriverPitStopsMeta(
    @Args() args: AllEventSessionTeamDriverPitStopsArgs
  ): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionTeamDriverPitStop.count();
    return {
      count,
    };
  }
}
