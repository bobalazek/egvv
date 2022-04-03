import { Resolver, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionTeamDriverClassificationsArgs } from '../args/all-event-session-team-driver-classificaitions.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionTeamDriverClassification } from '../models/event-session-team-driver-classification.model';
import { AbstractResolver } from './abstract.resolver';

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
        id: parseInt(args.id),
      },
    });
  }

  @Query(() => [EventSessionTeamDriverClassification])
  async allEventSessionTeamDriverClassifications(@Args() args: AllEventSessionTeamDriverClassificationsArgs) {
    return this._prismaService.eventSessionTeamDriverClassification.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allEventSessionTeamDriverClassificationsMeta(
    @Args() args: AllEventSessionTeamDriverClassificationsArgs
  ): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionTeamDriverClassification.count();
    return {
      count,
    };
  }
}
