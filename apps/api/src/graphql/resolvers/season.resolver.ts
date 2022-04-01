import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllSeasonsArgs } from '../args/all-seasons.args';
import { SeasonTeam } from '../models/season-team.model';
import { Season } from '../models/season.model';
import { Series } from '../models/series.model';

@Resolver(Season)
export class SeasonResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [Season])
  async seasons(@Args() args: AllSeasonsArgs) {
    return this._prismaService.season.findMany({
      skip: (args.page - 1) * args.perPage + 1,
      take: args.perPage,
      where: {
        series: {
          slug: args.seriesSlug,
        },
      },
      orderBy: {
        startAt: 'desc',
      },
    });
  }

  @Query(() => Season)
  async season(@Args() args: IdArgs) {
    return this._prismaService.season.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('seasonTeams', () => [SeasonTeam])
  async seasonTeams(@Parent() parent: Season) {
    return this._prismaService.seasonTeam.findMany({
      where: {
        seasonId: parseInt(parent.id),
      },
    });
  }

  @ResolveField('series', () => Series)
  async series(@Parent() parent: Season) {
    return this._prismaService.series.findFirst({
      where: {
        id: parent.seriesId,
      },
    });
  }
}
