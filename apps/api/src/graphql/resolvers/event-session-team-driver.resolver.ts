import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionTeamDriversArgs } from '../args/event-session-team-driver/all-event-session-team-drivers.args';
import { CreateEventSessionTeamDriverArgs } from '../args/event-session-team-driver/create-event-session-team-driver.args';
import { UpdateEventSessionTeamDriverDriverArgs } from '../args/event-session-team-driver/update-event-session-team-driver.args';
import { IdArgs } from '../args/id.args';
import { EventSessionTeamDriver } from '../models/event-session-team-driver.model';
import { EventSession } from '../models/event-session.model';
import { ListMetadata } from '../models/list-metadata.model';
import { SeasonDriver } from '../models/season-driver.model';
import { AbstractResolver } from './abstract.resolver';

@Resolver(EventSessionTeamDriver)
export class EventSessionTeamDriverResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => EventSessionTeamDriver)
  async EventSessionTeamDriver(@Args() args: IdArgs) {
    return this._prismaService.eventSessionTeamDriver.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [EventSessionTeamDriver])
  async allEventSessionTeamDrivers(@Args() args: AllEventSessionTeamDriversArgs) {
    return this._prismaService.eventSessionTeamDriver.findMany(this.getAllArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allEventSessionTeamDriversMeta(@Args() args: AllEventSessionTeamDriversArgs): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionTeamDriver.count(this.getAllArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => EventSessionTeamDriver)
  async createEventSessionTeamDriver(@Args() args: CreateEventSessionTeamDriverArgs) {
    return this._prismaService.eventSessionTeamDriver.create({
      data: args,
    });
  }

  @Mutation(() => EventSessionTeamDriver)
  async updateEventSessionTeamDriver(@Args() args: UpdateEventSessionTeamDriverDriverArgs) {
    return this._prismaService.eventSessionTeamDriver.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => EventSessionTeamDriver)
  async deleteEventSessionTeamDriver(@Args() args: IdArgs) {
    return this._prismaService.eventSessionTeamDriver.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('eventSession', () => EventSession)
  async eventSession(@Parent() parent: EventSessionTeamDriver) {
    return this._prismaService.eventSession.findFirst({
      where: {
        id: parent.eventSessionId,
      },
    });
  }

  @ResolveField('seasonDriver', () => SeasonDriver)
  async seasonDriver(@Parent() parent: EventSessionTeamDriver) {
    return this._prismaService.seasonDriver.findFirst({
      where: {
        id: parent.seasonDriverId,
      },
    });
  }
}
