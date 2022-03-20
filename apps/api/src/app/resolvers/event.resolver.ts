import { Resolver, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { EventArgs } from '../args/event.args';
import { Event } from '../types/event.type';

@Resolver(Event)
export class EventResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Event])
  async events(@Args() args: EventArgs) {
    return this._prismaService.event.findMany({
      where: {
        season: {
          series: {
            slug: args.seriesSlug,
          },
        },
      },
    });
  }
}
