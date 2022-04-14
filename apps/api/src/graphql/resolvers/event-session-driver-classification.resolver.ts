import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AbstractResolver } from './abstract.resolver';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { EventSessionDriverClassification } from '../models/event-session-driver-classification.model';
import { AllEventSessionDriverClassificationsArgs } from '../args/event-session-driver-classification/all-event-session-driver-classificaitions.args';
import { CreateEventSessionDriverClassificationArgs } from '../args/event-session-driver-classification/create-event-session-driver-classification.args';
import { UpdateEventSessionDriverDriverClassificationArgs } from '../args/event-session-driver-classification/update-event-session-driver-classification.args';
import { EventSessionDriver } from '../models/event-session-driver.model';

@Resolver(EventSessionDriverClassification)
export class EventSessionDriverClassificationResolver extends AbstractResolver {
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
    return this._prismaService.eventSessionDriverClassification.findMany(await this.getAllArgs(args, false));
  }

  @Query(() => ListMetadata)
  async _allEventSessionDriverClassificationsMeta(
    @Args() args: AllEventSessionDriverClassificationsArgs
  ): Promise<ListMetadata> {
    const count = await this._prismaService.eventSessionDriverClassification.count(await this.getAllArgs(args, true));
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

  @ResolveField('eventSessionDriver', () => EventSessionDriver)
  async eventSessionDriver(@Parent() parent: EventSessionDriverClassification) {
    return this._prismaService.eventSessionDriver.findFirst({
      where: {
        id: parent.eventSessionDriverId,
      },
    });
  }
}
