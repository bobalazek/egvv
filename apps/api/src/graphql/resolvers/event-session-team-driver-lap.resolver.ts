import { Resolver, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionTeamDriverLapsArgs } from '../args/all-event-session-team-driver-laps.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionTeamDriverLap } from '../models/event-session-team-driver-lap.model';
import { AbstractResolver } from './abstract.resolver';

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
    return this._prismaService.eventSessionTeamDriverLap.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allEventSessionTeamDriverLapsMeta(@Args() args: AllEventSessionTeamDriverLapsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionTeamDriverLap.count();
    return {
      count,
    };
  }
}
