import { Resolver, Query, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllSeasonsArgs } from '../args/season/all-seasons.args';
import { SeasonTeam } from '../models/season-team.model';
import { Season } from '../models/season.model';
import { Series } from '../models/series.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateSeasonArgs } from '../args/season/create-season.args';
import { UpdateSeasonArgs } from '../args/season/update-season.args';

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
        id: args.id,
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

  @Mutation(() => Season)
  async createSeason(@Args() args: CreateSeasonArgs) {
    return this._prismaService.season.create({
      data: args,
    });
  }

  @Mutation(() => Season)
  async updateSeason(@Args() args: UpdateSeasonArgs) {
    return this._prismaService.season.update({
      where: {
        id: args.id,
      },
      data: {
        slug: args.slug,
        name: args.name,
        startAt: args.startAt,
        endAt: args.endAt,
        year: args.year,
        seriesId: args.seriesId,
      },
    });
  }

  @Mutation(() => Season)
  async deleteSeason(@Args() args: IdArgs) {
    return this._prismaService.season.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('seasonTeams', () => [SeasonTeam])
  async seasonTeams(@Parent() parent: Season) {
    return this._prismaService.seasonTeam.findMany({
      where: {
        seasonId: parent.id,
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
