import { Resolver, Query, Args } from '@nestjs/graphql';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { Prisma } from '@prisma/client';
import { API_SERVER_URL } from '@egvv/shared-constants';
import { PrismaService } from '../../../app/services/prisma.service';
import { TeamVehicleAssetsArgs } from '../../args/assets/team-vehicle-assets.args';
import { TeamVehicleAsset } from '../../models/assets/team-vehicle-asset.model';
import { AbstractResolver } from '../abstract.resolver';
import { ASSETS_SERIES_DIRECTORY } from '../../../constants';

@Resolver(TeamVehicleAsset)
export class TeamVehicleAssetsResolver extends AbstractResolver {
  constructor(prismaService: PrismaService) {
    super(prismaService);
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

    const teamVehicleAssets: TeamVehicleAsset[] = [];
    for (const seasonTeam of seasonTeams) {
      const SEASON_DIRECTORY = join(ASSETS_SERIES_DIRECTORY, seasonTeam.season.series.slug, seasonTeam.season.slug);
      const SEASON_TEAMS_DIRECTORY = join(SEASON_DIRECTORY, 'teams');
      const VEHICLES_JSON_PATH = join(SEASON_TEAMS_DIRECTORY, seasonTeam.team.slug, 'vehicles.json');
      if (!existsSync(VEHICLES_JSON_PATH)) {
        continue;
      }

      const vehiclesRawData = readFileSync(VEHICLES_JSON_PATH);
      const vehiclesData = JSON.parse(vehiclesRawData.toString());

      for (const vehicleData of vehiclesData) {
        const url =
          `${API_SERVER_URL}/assets/series/{seriesSlug}/{seasonSlug}/teams/{teamSlug}/vehicles/{vehicleKey}/vehicle-body.glb`
            .replace('{seriesSlug}', seasonTeam.season.series.slug)
            .replace('{seasonSlug}', seasonTeam.season.slug)
            .replace('{teamSlug}', seasonTeam.team.slug)
            .replace('{vehicleKey}', vehicleData.key);

        teamVehicleAssets.push({
          url,
          key: vehicleData.key,
          name: vehicleData.name,
          seasonTeamName: seasonTeam.name,
          teamSlug: seasonTeam.team.slug,
          seasonSlug: seasonTeam.season.slug,
        });
      }
    }

    return teamVehicleAssets;
  }
}