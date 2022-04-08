import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PrismaService } from '../../app/services/prisma.service';
import { AllEventSessionDriverClassificationsArgs } from '../args/event-session-driver-classification/all-event-session-driver-classificaitions.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionDriverClassification } from '../models/event-session-driver-classification.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateEventSessionDriverClassificationArgs } from '../args/event-session-driver-classification/create-event-session-driver-classification.args';
import { UpdateEventSessionDriverDriverClassificationArgs } from '../args/event-session-driver-classification/update-event-session-driver-classification.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

@Resolver(EventSessionDriverClassification)
export class EventSessionDriverClassificationResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => EventSessionDriverClassification)
  async EventSessionDriverClassification(@Args() args: IdArgs) {
    return this._prismaService.eventSessionDriverClassification.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [EventSessionDriverClassification])
  async allEventSessionDriverClassifications(@Args() args: AllEventSessionDriverClassificationsArgs) {
    return this._prismaService.eventSessionDriverClassification.findMany(this.getAllArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allEventSessionDriverClassificationsMeta(
    @Args() args: AllEventSessionDriverClassificationsArgs
  ): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionDriverClassification.count(this.getAllArgs(args, true));
    return {
      count,
    };
  }

  @Mutation(() => EventSessionDriverClassification)
  @UseGuards(GqlAuthGuard)
  async createEventSessionDriverClassification(@Args() args: CreateEventSessionDriverClassificationArgs) {
    return this._prismaService.eventSessionDriverClassification.create({
      data: args,
    });
  }

  @Mutation(() => EventSessionDriverClassification)
  @UseGuards(GqlAuthGuard)
  async updateEventSessionDriverClassification(@Args() args: UpdateEventSessionDriverDriverClassificationArgs) {
    return this._prismaService.eventSessionDriverClassification.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => EventSessionDriverClassification)
  @UseGuards(GqlAuthGuard)
  async deleteEventSessionDriverClassification(@Args() args: IdArgs) {
    return this._prismaService.eventSessionDriverClassification.delete({
      where: {
        id: args.id,
      },
    });
  }
}
