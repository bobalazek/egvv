import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { SeasonArgs } from '../args/season.args';
import { SeasonsArgs } from '../args/seasons.args';
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
  async seasons(@Args() args: SeasonsArgs) {
    return this._prismaService.season.findMany({
      skip: args.offset,
      take: args.limit,
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
  async season(@Args() args: SeasonArgs) {
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
