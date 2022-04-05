import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionTeamDriverClassificationsArgs } from '../args/event-session-team-driver-classification/all-event-session-team-driver-classificaitions.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionTeamDriverClassification } from '../models/event-session-team-driver-classification.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateEventSessionTeamDriverClassificationArgs } from '../args/event-session-team-driver-classification/create-event-session-team-driver-classification.args';
import { UpdateEventSessionTeamDriverDriverClassificationArgs } from '../args/event-session-team-driver-classification/update-event-session-team-driver-classification.args';

@Resolver(EventSessionTeamDriverClassification)
export class EventSessionTeamDriverClassificationResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => EventSessionTeamDriverClassification)
  async EventSessionTeamDriverClassification(@Args() args: IdArgs) {
    return this._prismaService.eventSessionTeamDriverClassification.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [EventSessionTeamDriverClassification])
  async allEventSessionTeamDriverClassifications(@Args() args: AllEventSessionTeamDriverClassificationsArgs) {
    return this._prismaService.eventSessionTeamDriverClassification.findMany(this.getAllArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allEventSessionTeamDriverClassificationsMeta(
    @Args() args: AllEventSessionTeamDriverClassificationsArgs
  ): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionTeamDriverClassification.count(this.getAllArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => EventSessionTeamDriverClassification)
  async createEventSessionTeamDriverClassification(@Args() args: CreateEventSessionTeamDriverClassificationArgs) {
    return this._prismaService.eventSessionTeamDriverClassification.create({
      data: args,
    });
  }

  @Mutation(() => EventSessionTeamDriverClassification)
  async updateEventSessionTeamDriverClassification(@Args() args: UpdateEventSessionTeamDriverDriverClassificationArgs) {
    return this._prismaService.eventSessionTeamDriverClassification.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => EventSessionTeamDriverClassification)
  async deleteEventSessionTeamDriverClassification(@Args() args: IdArgs) {
    return this._prismaService.eventSessionTeamDriverClassification.delete({
      where: {
        id: args.id,
      },
    });
  }
}
