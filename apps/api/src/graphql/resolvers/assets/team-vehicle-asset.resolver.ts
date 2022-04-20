import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';

import { Prisma } from '@prisma/client';
import { AbstractResolver } from '../abstract.resolver';
import { PrismaService } from '../../../app/services/prisma.service';
import { AssetsService } from '../../services/assets.service';
import { TeamVehicleAssetsArgs } from '../../args/assets/team-vehicle-assets.args';
import { TeamVehicleAsset } from '../../models/assets/team-vehicle-asset.model';
import { SeasonTeam } from '../../models/season-team.model';
import { SeasonTyreAsset } from '../../models/assets/season-tyre-asset.model';

@Resolver(TeamVehicleAsset)
export class TeamVehicleAssetResolver extends AbstractResolver {
  private _assetsService: AssetsService;

  constructor(prismaService: PrismaService, assetsService: AssetsService) {
    super(prismaService);

    this._assetsService = assetsService;
  }

  @Query(() => [TeamVehicleAsset])
  async teamVehicleAssets(@Args() args: TeamVehicleAssetsArgs) {
    if (!args.seasonSlug && !args.teamSlug) {
      throw new Error(`You need to either specify the season, or the team slug argument.`);
    }

    const seasonTeamWhere: Prisma.SeasonTeamWhereInput = {};

    if (args.seasonSlug) {
      seasonTeamWhere.season = {
        slug: args.seasonSlug,
      };
    }

    if (args.teamSlug) {
      seasonTeamWhere.team = {
        slug: args.teamSlug,
      };
    }

    const seasonTeams = await this._prismaService.seasonTeam.findMany({
      where: seasonTeamWhere,
      include: {
        team: true,
        season: {
          include: {
            series: true,
          },
        },
      },
    });

    return this._assetsService.getTeamVehicleAssets(seasonTeams);
  }

  @ResolveField('seasonTeam', () => SeasonTeam)
  async season(@Parent() parent: TeamVehicleAsset) {
    return this._prismaService.seasonTeam.findFirst({
      where: {
        id: parent.seasonTeamId,
      },
    });
  }

  @ResolveField('seasonTyreAssets', () => [SeasonTyreAsset])
  async seasonTyreAssets(@Parent() parent: TeamVehicleAsset) {
    const seasonTeam = await this._prismaService.seasonTeam.findFirst({
      where: {
        id: parent.seasonTeamId,
      },
      include: {
        season: {
          include: {
            series: true,
          },
        },
      },
    });

    return this._assetsService.getSeasonTyreAssets(seasonTeam.season);
  }
}
