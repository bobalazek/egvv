import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllSeasonsArgs } from '../args/all-seasons.args';
import { SeasonTeam } from '../models/season-team.model';
import { Season } from '../models/season.model';
import { Series } from '../models/series.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AbstractResolver } from './abstract.resolver';

@Resolver(Season)
export class SeasonResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => Season)
  async Season(@Args() args: IdArgs) {
    return this._prismaService.season.findFirst({
      where: {
        id: parseInt(args.id),
      },
    });
  }

  @Query(() => [Season])
  async allSeasons(@Args() args: AllSeasonsArgs) {
    return this._prismaService.season.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allSeasonsMeta(@Args() args: AllSeasonsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.season.count();
    return {
      count,
    };
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
